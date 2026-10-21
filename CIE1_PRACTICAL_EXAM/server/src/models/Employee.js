import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['EMPLOYEE', 'HR'], default: 'EMPLOYEE' },
  department: { type: String, required: true, trim: true },
  annualLeaveAllowance: { type: Number, min: 0, default: 20 }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
