# User Interviews

Three conversations conducted during the week of May 19-25, 2026.
Each interview was 10-15 minutes via WhatsApp call or chat.

---

## Interview 1

Name: R.K. (anonymized on request)
Role: College student, occasional developer
Company stage: Personal projects, no revenue

### Notes

R.K. uses ChatGPT free tier for coding help and writing assignments. He has never paid for any AI tool. He said he thinks about upgrading to Plus occasionally when he hits the usage limit during exams or project deadlines, but never follows through because he is not sure it is worth it.

When asked about alternatives he said he has heard of Claude but never tried it seriously. He does not know the difference between Claude Pro and ChatGPT Plus in terms of pricing or capability.

### Direct Quotes

"Bhai main mostly ChatGPT use karta hu, free wala hi chalata hu."

"Kabhi kabhi lagta hai Pro le lu but phir bhool jaata hu."

"Honestly mujhe samajh nahi aata kaunsa best hai — sab same lagte hain bahar se."

### Most Surprising Thing

He did not know Claude had a free tier. When I told him Claude Free exists and is comparable to ChatGPT Free, he said he would try it. The assumption that ChatGPT is the only free option is very common among non-technical users.

### What It Changed About My Design

I added clearer plan labels in the audit form — showing Free, Pro, and paid tiers side by side so users who are on free plans can still complete the audit and get a "you are spending well" result rather than feeling the tool is not for them.

---

## Interview 2

Name: A.S. (anonymized on request)
Role: Software Developer
Company stage: Full-time employed at a mid-size product company

### Notes

A.S. pays for both ChatGPT Plus at roughly $20 per month and GitHub Copilot Individual at $10 per month. Total spend is around $30 per month or roughly Rs 2500. He uses ChatGPT for writing documentation, debugging explanations, and quick lookups. He uses Copilot for inline code suggestions inside VS Code.

He mentioned the overlap — sometimes he asks ChatGPT something he could have just let Copilot handle inline, or vice versa. He said he has tried Claude but did not switch fully because his workflow is already set up around the two tools he has.

When asked if he had benchmarked his spend against alternatives he said no — he just renewed both subscriptions automatically without revisiting the decision.

### Direct Quotes

"I use ChatGPT Plus and GitHub Copilot regularly — monthly spend is around Rs 1500 to 1800."

"Thoda lagta hai overlap hai sometimes — dono se same kaam ho jaata hai."

"Cost optimize karna hai but time nahi milta research karne ka."

### Most Surprising Thing

He was not aware that Claude Pro at $20 per month could replace both ChatGPT Plus for conversation and partially reduce his Copilot usage through Claude's coding capability. The idea that one tool could consolidate two subscriptions had not occurred to him because he had never seen a side-by-side comparison.

### What It Changed About My Design

This directly validated the cross-tool alternative logic in the audit engine — specifically the rule that flags users paying for both Claude and ChatGPT as candidates for consolidation. I also made the consolidation recommendation more prominent on the results page.

---

## Interview 3

Name: P.D. (anonymized on request)
Role: Freelance Designer
Company stage: Solo freelancer, 2 years running

### Notes

P.D. pays for Midjourney and Canva Pro. Total spend is over Rs 2000 per month. She uses Midjourney for client mood boards and concept visuals, and Canva for final deliverables and social media assets.

She said she has looked for cheaper alternatives but either the quality was noticeably lower or switching would require changing her entire workflow and learning a new tool. She mentioned that the switching cost in time feels higher than the monthly savings.

She was skeptical when I described the audit tool — her first reaction was "these tools always recommend switching to something I have never heard of." This was a useful challenge.

### Direct Quotes

"Midjourney plus Canva AI use karta hu — Rs 2000 plus ho jaata hai monthly."

"Dhunda tha alternatives but ya to quality low thi ya workflow change karna padta."

"Agar koi cheaper same quality tool mile to definitely switch karunga — but main nahi dhundhti kyunki time nahi hai."

### Most Surprising Thing

The switching cost objection. She is aware she might be overpaying but the friction of evaluating alternatives is itself a barrier. This means the audit tool needs to do more than surface savings — it needs to make the recommendation so specific and low-effort that the switching cost feels worth it.

### What It Changed About My Design

I made the recommendation text on the results page more actionable — instead of just saying "switch to X" I added a one-sentence reason that addresses the switching cost directly, for example "Same capability, 5-minute plan change, no workflow disruption."