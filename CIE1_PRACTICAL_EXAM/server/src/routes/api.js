import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import LeaveType from '../models/LeaveType.js';
import LeaveRequest from '../models/LeaveRequest.js';
import { authGuard, requireHR } from '../middleware/auth.js';

const router = Router();
const publicEmployee = employee => ({
  id: employee._id, name: employee.name, email: employee.email,
  role: employee.role, department: employee.department,
  annualLeaveAllowance: employee.annualLeaveAllowance
});
const countDays = (from, to) => Math.floor((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
  Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / 86400000) + 1;

// 1. Login
router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Email and password are required.' } });
    const employee = await Employee.findOne({ email: String(email).toLowerCase().trim() });
    if (!employee || !(await bcrypt.compare(password, employee.passwordHash))) {
      return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Email or password is incorrect.' } });
    }
    const token = jwt.sign({ id: employee.id, role: employee.role, name: employee.name }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, employee: publicEmployee(employee) });
  } catch (err) { next(err); }
});

// 2. List leave types
router.get('/leave-types', authGuard, async (req, res, next) => {
  try { res.json({ data: await LeaveType.find().sort({ name: 1 }).lean() }); }
  catch (err) { next(err); }
});

// 3. List leave requests; employees see their own, HR sees all
router.get('/leaves', authGuard, async (req, res, next) => {
  try {
    const filter = req.user.role === 'HR' ? {} : { employeeId: req.user.id };
    if (req.query.status && ['pending', 'approved', 'rejected'].includes(req.query.status)) filter.status = req.query.status;
    const data = await LeaveRequest.find(filter).populate('employeeId', 'name email department')
      .populate('leaveTypeId', 'name annualDays').sort({ createdAt: -1 }).lean();
    res.json({ data });
  } catch (err) { next(err); }
});

// 4. Submit a leave request
router.post('/leaves', authGuard, async (req, res, next) => {
  try {
    const { leaveTypeId, fromDate, toDate, reason } = req.body || {};
    if (!mongoose.isValidObjectId(leaveTypeId)) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Choose a valid leave type.' } });
    const start = new Date(fromDate), end = new Date(toDate);
    if (!fromDate || !toDate || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return res.status(400).json({ error: { code: 'INVALID_DATES', message: 'Enter valid dates; the end date cannot be before the start date.' } });
    }
    if (!reason || !String(reason).trim() || String(reason).trim().length > 500) {
      return res.status(400).json({ error: { code: 'INVALID_REASON', message: 'Reason is required and must be at most 500 characters.' } });
    }
    const type = await LeaveType.findById(leaveTypeId);
    if (!type) return res.status(400).json({ error: { code: 'INVALID_LEAVE_TYPE', message: 'Selected leave type does not exist.' } });
    const days = countDays(start, end);
    if (days > type.annualDays) return res.status(400).json({ error: { code: 'TYPE_LIMIT_EXCEEDED', message: `${type.name} requests may not exceed ${type.annualDays} days.` } });
    const employee = await Employee.findById(req.user.id);
    const yearStart = new Date(start.getFullYear(), 0, 1), yearEnd = new Date(start.getFullYear(), 11, 31, 23, 59, 59);
    const existing = await LeaveRequest.find({ employeeId: employee.id, status: { $in: ['pending', 'approved'] }, fromDate: { $lte: yearEnd }, toDate: { $gte: yearStart } });
    const used = existing.reduce((sum, item) => sum + item.days, 0);
    if (used + days > employee.annualLeaveAllowance) {
      return res.status(400).json({ error: { code: 'BALANCE_EXCEEDED', message: `Insufficient leave balance. Available: ${Math.max(0, employee.annualLeaveAllowance - used)} day(s).` } });
    }
    const overlap = existing.some(item => start <= item.toDate && end >= item.fromDate);
    if (overlap) return res.status(400).json({ error: { code: 'DATE_OVERLAP', message: 'This request overlaps an existing pending or approved leave.' } });
    const request = await LeaveRequest.create({ employeeId: employee.id, leaveTypeId, fromDate: start, toDate: end, days, reason: String(reason).trim() });
    const populated = await request.populate([{ path: 'employeeId', select: 'name email department' }, { path: 'leaveTypeId', select: 'name annualDays' }]);
    res.status(201).json({ message: 'Leave request submitted successfully.', data: populated });
  } catch (err) { next(err); }
});

// 5. HR reviews a leave request
router.patch('/leaves/:id/status', authGuard, requireHR, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: { code: 'INVALID_ID', message: 'Invalid leave request ID.' } });
    const { status } = req.body || {};
    if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ error: { code: 'INVALID_STATUS', message: 'Status must be approved or rejected.' } });
    const request = await LeaveRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Leave request not found.' } });
    if (request.status !== 'pending') return res.status(409).json({ error: { code: 'ALREADY_REVIEWED', message: 'Only pending requests can be reviewed.' } });
    request.status = status; request.reviewedBy = req.user.id; request.reviewedAt = new Date();
    await request.save();
    await request.populate([{ path: 'employeeId', select: 'name email department' }, { path: 'leaveTypeId', select: 'name annualDays' }]);
    res.json({ message: `Leave request ${status}.`, data: request });
  } catch (err) { next(err); }
});

export default router;
