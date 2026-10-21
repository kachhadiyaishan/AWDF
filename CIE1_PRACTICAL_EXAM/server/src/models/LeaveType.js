import mongoose from 'mongoose';

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  annualDays: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('LeaveType', leaveTypeSchema);
