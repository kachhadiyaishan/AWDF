import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Employee from './models/Employee.js';
import LeaveType from './models/LeaveType.js';

await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cie1_leave_management');
const passwordHash = await bcrypt.hash('Password123!', 10);
await Employee.findOneAndUpdate({ email: 'aarav@techsolutions.com' }, {
  name: 'Aarav Sharma', email: 'aarav@techsolutions.com', passwordHash,
  role: 'EMPLOYEE', department: 'Engineering', annualLeaveAllowance: 20
}, { upsert: true, new: true, setDefaultsOnInsert: true });
await Employee.findOneAndUpdate({ email: 'hr@techsolutions.com' }, {
  name: 'Priya Mehta', email: 'hr@techsolutions.com', passwordHash,
  role: 'HR', department: 'Human Resources', annualLeaveAllowance: 20
}, { upsert: true, new: true, setDefaultsOnInsert: true });
for (const item of [
  { name: 'Casual', annualDays: 12, description: 'Personal and family commitments' },
  { name: 'Sick', annualDays: 10, description: 'Illness or medical appointments' },
  { name: 'Earned', annualDays: 15, description: 'Planned annual leave' }
]) await LeaveType.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true, setDefaultsOnInsert: true });
console.log('Seed data created. Employee: aarav@techsolutions.com, HR: hr@techsolutions.com; password: Password123!');
await mongoose.disconnect();
