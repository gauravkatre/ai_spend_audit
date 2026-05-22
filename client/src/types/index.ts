export interface ToolInput {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditResult {
  toolName: string;
  currentSpend: number;
  recommendedAction: string;
  savings: number;
  reason: string;
}

export interface AuditResponse {
  shareId: string;
  results: AuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string;
  teamSize: number;
  primaryUseCase: string;
}

export interface LeadForm {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
}

export const TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    plans: ['hobby', 'pro', 'business', 'enterprise'],
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    plans: ['individual', 'business', 'enterprise'],
  },
  {
    id: 'claude',
    name: 'Claude',
    plans: ['free', 'pro', 'max', 'team', 'enterprise'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    plans: ['plus', 'team', 'enterprise'],
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    plans: ['direct'],
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    plans: ['direct'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    plans: ['pro', 'ultra', 'api'],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    plans: ['free', 'pro', 'team'],
  },
];