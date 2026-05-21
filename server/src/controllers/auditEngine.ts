import { IToolInput, IAuditResult } from '../models/Audit.js';

// =====================
// PRICING DATA (as of May 2026)
// =====================
const PRICING: Record<string, Record<string, number>> = {
  cursor: { hobby: 0, pro: 20, business: 40, enterprise: 60 },
  github_copilot: { individual: 10, business: 19, enterprise: 39 },
  claude: { free: 0, pro: 20, max: 100, team: 30, enterprise: 60 },
  chatgpt: { plus: 20, team: 30, enterprise: 60 },
  anthropic_api: { direct: 0 },
  openai_api: { direct: 0 },
  gemini: { pro: 20, ultra: 40, api: 0 },
  windsurf: { free: 0, pro: 15, team: 30 },
};

// =====================
// AUDIT RULES
// =====================
interface AuditRule {
  condition: (tool: IToolInput) => boolean;
  recommendation: string;
  savingsPercent: number;
  reason: string;
}

const AUDIT_RULES: Record<string, AuditRule[]> = {
  cursor: [
    {
      condition: (t) => t.plan === 'business' && t.seats <= 2,
      recommendation: 'Downgrade to Pro plan',
      savingsPercent: 50,
      reason: 'Business plan is overkill for teams of 2 or fewer. Pro plan at $20/user covers all core features.',
    },
    {
      condition: (t) => t.plan === 'enterprise' && t.seats <= 5,
      recommendation: 'Downgrade to Business plan',
      savingsPercent: 33,
      reason: 'Enterprise tier is designed for 10+ seat orgs with SSO/compliance needs. Business plan suffices for small teams.',
    },
  ],
  github_copilot: [
    {
      condition: (t) => t.plan === 'business' && t.seats <= 3,
      recommendation: 'Switch to Individual plan per developer',
      savingsPercent: 47,
      reason: 'Individual plan at $10/user is significantly cheaper for teams under 4. Business adds admin features most small teams never use.',
    },
    {
      condition: (t) => t.plan === 'enterprise' && t.seats <= 10,
      recommendation: 'Downgrade to Business plan',
      savingsPercent: 51,
      reason: 'Enterprise GitHub Copilot adds policy controls and audit logs. Teams under 10 rarely need these compliance features.',
    },
  ],
  claude: [
    {
      condition: (t) => t.plan === 'max' && t.seats === 1,
      recommendation: 'Downgrade to Pro plan',
      savingsPercent: 80,
      reason: 'Claude Max is $100/mo designed for power users needing 5x more usage. Most users never hit Pro limits.',
    },
    {
      condition: (t) => t.plan === 'team' && t.seats <= 2,
      recommendation: 'Switch to individual Pro plans',
      savingsPercent: 33,
      reason: 'Team plan at $30/user has a 5-seat minimum. For 2 users, individual Pro at $20/user is cheaper.',
    },
    {
      condition: (t) => t.plan === 'enterprise' && t.seats <= 5,
      recommendation: 'Downgrade to Team plan',
      savingsPercent: 50,
      reason: 'Enterprise Claude adds SSO and advanced security. Small teams under 5 rarely need these features.',
    },
  ],
  chatgpt: [
    {
      condition: (t) => t.plan === 'team' && t.seats <= 2,
      recommendation: 'Switch to individual Plus plans',
      savingsPercent: 33,
      reason: 'ChatGPT Team has a minimum billing threshold. Two individual Plus plans at $20/user each is more economical.',
    },
    {
      condition: (t) => t.plan === 'enterprise' && t.seats <= 10,
      recommendation: 'Downgrade to Team plan',
      savingsPercent: 50,
      reason: 'Enterprise ChatGPT is priced for large orgs needing SAML SSO, advanced admin, and dedicated support.',
    },
  ],
  gemini: [
    {
      condition: (t) => t.plan === 'ultra' && t.seats <= 2,
      recommendation: 'Downgrade to Pro plan',
      savingsPercent: 50,
      reason: 'Gemini Ultra is designed for heavy multimodal workloads. Pro handles most coding and writing tasks at half the cost.',
    },
  ],
  windsurf: [
    {
      condition: (t) => t.plan === 'team' && t.seats <= 2,
      recommendation: 'Switch to individual Pro plans',
      savingsPercent: 50,
      reason: 'Windsurf Team plan overhead is not worth it for very small teams. Individual Pro plans are more cost effective.',
    },
  ],
};

// =====================
// CROSS-TOOL ALTERNATIVES
// =====================
interface AlternativeSuggestion {
  condition: (tool: IToolInput, allTools: IToolInput[]) => boolean;
  recommendation: string;
  savingsPercent: number;
  reason: string;
}

const ALTERNATIVES: Record<string, AlternativeSuggestion> = {
  cursor_to_windsurf: {
    condition: (tool, allTools) =>
      tool.toolName === 'cursor' &&
      tool.plan === 'business' &&
      !allTools.find((t) => t.toolName === 'windsurf'),
    recommendation: 'Consider switching to Windsurf Pro',
    savingsPercent: 25,
    reason: 'Windsurf Pro at $15/user offers comparable AI coding features to Cursor Business at $40/user — saving $25/user/month.',
  },
  both_claude_and_chatgpt: {
    condition: (_tool, allTools) =>
      allTools.some((t) => t.toolName === 'claude') &&
      allTools.some((t) => t.toolName === 'chatgpt'),
    recommendation: 'Consolidate to one LLM — keep Claude or ChatGPT, not both',
    savingsPercent: 100,
    reason: 'Your team is paying for both Claude and ChatGPT. For most use cases one tool covers all needs. Pick the one your team uses more.',
  },
};

// =====================
// MAIN AUDIT FUNCTION
// =====================
export const runAuditEngine = (
  tools: IToolInput[],
  teamSize: number,
  primaryUseCase: string
): { results: IAuditResult[]; totalMonthlySavings: number; totalAnnualSavings: number } => {
  const results: IAuditResult[] = [];

  for (const tool of tools) {
    const toolKey = tool.toolName.toLowerCase().replace(/\s/g, '_');
    const rules = AUDIT_RULES[toolKey] || [];
    let matched = false;

    // Rule check
    for (const rule of rules) {
      if (rule.condition(tool)) {
        const savings = (tool.monthlySpend * rule.savingsPercent) / 100;
        results.push({
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedAction: rule.recommendation,
          savings: Math.round(savings),
          reason: rule.reason,
        });
        matched = true;
        break;
      }
    }

    // Alternative check — sirf tab jab koi rule match na hua ho
    if (!matched) {
      for (const alt of Object.values(ALTERNATIVES)) {
        if (alt.condition(tool, tools)) {
          const savings = (tool.monthlySpend * alt.savingsPercent) / 100;
          results.push({
            toolName: tool.toolName,
            currentSpend: tool.monthlySpend,
            recommendedAction: alt.recommendation,
            savings: Math.round(savings),
            reason: alt.reason,
          });
          matched = true;
          break;
        }
      }
    }

    // Koi bhi match nahi — spending well
    if (!matched) {
      results.push({
        toolName: tool.toolName,
        currentSpend: tool.monthlySpend,
        recommendedAction: 'No changes needed',
        savings: 0,
        reason: `Your ${tool.toolName} plan looks well-optimized for your team size and usage.`,
      });
    }
  }

  const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return { results, totalMonthlySavings, totalAnnualSavings };
};