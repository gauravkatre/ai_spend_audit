import mongoose, { Document, Schema } from 'mongoose';

export interface IToolInput {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface IAuditResult {
  toolName: string;
  currentSpend: number;
  recommendedAction: string;
  savings: number;
  reason: string;
}

export interface IAudit extends Document {
  shareId: string;
  tools: IToolInput[];
  teamSize: number;
  primaryUseCase: string;
  results: IAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string;
  createdAt: Date;
}

const ToolInputSchema = new Schema<IToolInput>({
  toolName: { type: String, required: true },
  plan: { type: String, required: true },
  monthlySpend: { type: Number, required: true },
  seats: { type: Number, required: true },
});

const AuditResultSchema = new Schema<IAuditResult>({
  toolName: { type: String, required: true },
  currentSpend: { type: Number, required: true },
  recommendedAction: { type: String, required: true },
  savings: { type: Number, required: true },
  reason: { type: String, required: true },
});

const AuditSchema = new Schema<IAudit>(
  {
    shareId: { type: String, required: true, unique: true },
    tools: [ToolInputSchema],
    teamSize: { type: Number, required: true },
    primaryUseCase: { type: String, required: true },
    results: [AuditResultSchema],
    totalMonthlySavings: { type: Number, required: true },
    totalAnnualSavings: { type: Number, required: true },
    aiSummary: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IAudit>('Audit', AuditSchema);