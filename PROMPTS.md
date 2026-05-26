## LLM Prompts Used in SpendSmart AI

## 1. Audit Summary Prompt

Used in: server/src/controllers/geminiSummary.ts
Model: Gemini 1.5 Flash

### Final Prompt

You are an AI spend advisor. Write a concise, friendly, and specific 100-word audit summary for a startup.

Team details:
- Team size: ${teamSize}
- Primary use case: ${primaryUseCase}
- Current AI tools: ${toolsList}
- Total potential monthly savings: $${totalMonthlySavings}
- Key recommendations: ${savingsList}

Rules:
- Be specific with numbers
- Mention 1-2 concrete recommendations
- End with an encouraging note
- Do NOT use bullet points, write in paragraph form
- Keep it under 100 words
- Tone: professional but friendly, like a trusted advisor

### Why I wrote it this way

The prompt is structured to give the model all relevant context upfront — team size, use case, tools, and savings — so the output is specific rather than generic. The rules section prevents common failure modes: bullet points instead of prose, vague language without numbers, and overly long responses.

### What I tried that did not work

First attempt had no rules section. The model returned bullet points and responses over 200 words consistently. Adding explicit format rules fixed both issues immediately.

Second attempt used "write a financial summary" as the framing. The tone came out too formal and cold. Changing framing to "trusted advisor" produced warmer, more actionable output.

Third attempt did not include the savings list in the prompt. The model invented recommendations not based on actual audit results. Adding savingsList as explicit context fixed hallucination.

### Fallback behavior

If Gemini API fails due to rate limit, network error, or invalid key, the system falls back to a hardcoded template in generateFallbackSummary(). The fallback uses the same variables — teamSize, primaryUseCase, totalMonthlySavings — to produce a reasonable paragraph without any API call. The user never sees an error.