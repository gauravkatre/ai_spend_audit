import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAuditResult } from '../models/Audit.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// =====================
// GEMINI SUMMARY
// =====================
export const generateAISummary = async (
  tools: { toolName: string; plan: string; monthlySpend: number; seats: number }[],
  results: IAuditResult[],
  totalMonthlySavings: number,
  teamSize: number,
  primaryUseCase: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const toolsList = tools
      .map((t) => `${t.toolName} (${t.plan}, ${t.seats} seats, $${t.monthlySpend}/mo)`)
      .join(', ');

    const savingsList = results
      .filter((r) => r.savings > 0)
      .map((r) => `${r.toolName}: save $${r.savings}/mo — ${r.recommendedAction}`)
      .join('; ');

    const prompt = `
You are an AI spend advisor. Write a concise, friendly, and specific 100-word audit summary for a startup.

Team details:
- Team size: ${teamSize}
- Primary use case: ${primaryUseCase}
- Current AI tools: ${toolsList}
- Total potential monthly savings: $${totalMonthlySavings}
- Key recommendations: ${savingsList || 'Spending is already optimized'}

Rules:
- Be specific with numbers
- Mention 1-2 concrete recommendations
- End with an encouraging note
- Do NOT use bullet points — write in paragraph form
- Keep it under 100 words
- Tone: professional but friendly, like a trusted advisor
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback template if API fails
    return generateFallbackSummary(totalMonthlySavings, teamSize, primaryUseCase);
  }
};

// =====================
// FALLBACK SUMMARY
// =====================
const generateFallbackSummary = (
  totalMonthlySavings: number,
  teamSize: number,
  primaryUseCase: string
): string => {
  if (totalMonthlySavings === 0) {
    return `Great news — your team of ${teamSize} is already spending efficiently on AI tools for ${primaryUseCase}. Your current plan selections are well-matched to your team size and usage patterns. Keep monitoring as your team grows, since thresholds for plan upgrades can shift quickly in this space.`;
  }

  return `Your team of ${teamSize} focused on ${primaryUseCase} has an opportunity to save $${totalMonthlySavings}/month ($${totalMonthlySavings * 12}/year) on AI tools. The biggest wins come from right-sizing plans to your actual team size — several of your current subscriptions are priced for larger organizations. Capturing these savings is straightforward and won't impact your team's productivity.`;
};