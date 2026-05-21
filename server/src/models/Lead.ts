import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
  totalMonthlySavings: number;
  isHighSavings: boolean;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    email: { type: String, required: true },
    companyName: { type: String },
    role: { type: String },
    teamSize: { type: Number },
    auditId: { type: String, required: true },
    totalMonthlySavings: { type: Number, required: true },
    isHighSavings: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ILead>('Lead', LeadSchema);