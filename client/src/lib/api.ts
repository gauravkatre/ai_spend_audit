import axios from 'axios';
import type { AuditResponse } from '../types/index.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const submitAudit = async (data: {
  tools: { toolName: string; plan: string; monthlySpend: number; seats: number }[];
  teamSize: number;
  primaryUseCase: string;
}): Promise<AuditResponse> => {
  const res = await api.post('/api/audit', data);
  return res.data;
};

export const getAuditByShareId = async (shareId: string): Promise<AuditResponse> => {
  const res = await api.get(`/api/audit/${shareId}`);
  return res.data;
};

export const submitLead = async (data: {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
  totalMonthlySavings: number;
}): Promise<void> => {
  await api.post('/api/leads', data);
};