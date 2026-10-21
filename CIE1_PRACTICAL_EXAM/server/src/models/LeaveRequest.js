import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  leaveTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  days: { type: Number, required: true, min: 1 },
  reason: { type: String, required: true, trim: true, maxlength: 500 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  reviewedAt: { type: Date, default: null }
}, { timestamps: true });

leaveRequestSchema.pre('validate', function () {
  if (this.fromDate && this.toDate && this.toDate < this.fromDate) {
    this.invalidate('toDate', 'End date must be on or after start date.');
  }
});

export default mongoose.model('LeaveRequest', leaveRequestSchema);
