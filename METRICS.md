# Metrics

## North Star Metric

Qualified leads generated per week — defined as email captures where totalMonthlySavings is greater than $100.

Why this and not DAU or total audits: This tool is used once per quarter at most, so daily active users is a meaningless metric. Total audits completed measures top of funnel but not business value. A qualified lead is the exact moment where the tool has delivered value to the user AND created a business opportunity for Credex. Everything else is a vanity metric.

## 3 Input Metrics That Drive the North Star

1. Audit completion rate
Definition: audits submitted divided by audit page visits
Why it matters: If users land on the audit form but do not complete it, the form is too long or confusing. Target: above 25%.

2. Email capture rate
Definition: email submissions divided by results page views
Why it matters: Users who see their results but do not leave an email are lost leads. This measures how compelling the results page is and how much the user trusts us. Target: above 30%.

3. High savings rate
Definition: audits showing more than $100 savings divided by total audits completed
Why it matters: If most audits return zero savings, the tool is not useful and lead quality is low. This measures whether we are attracting the right users — teams that are actually overspending. Target: above 40%.

## What I Would Instrument First

1. Audit form — track which tools are most commonly selected and which are abandoned mid-form
2. Results page — track scroll depth to see if users read the full breakdown or bounce after the hero savings number
3. Email capture button — track click rate on "Email Me This Report" vs how many actually complete the form
4. Share button — track how many users copy the shareable link (viral coefficient indicator)
5. High savings CTA — track clicks on the Credex consultation link for audits above $500 savings

All events tracked via a simple POST to /api/events endpoint stored in MongoDB. No third party analytics needed at MVP stage to avoid GDPR complexity.

## What Number Triggers a Pivot Decision

If after 200 completed audits:
- Email capture rate is below 15%: results page is not delivering enough value — rebuild the results UI or reconsider the email gate placement
- High savings rate is below 20%: wrong audience is using the tool — revisit distribution channels and messaging to target teams with larger AI budgets
- Audit completion rate is below 10%: form is too long or asking for information users do not have — simplify to 3 inputs maximum and infer the rest

If qualified leads per week stays at zero after 4 weeks of distribution effort, the tool is not finding the right users and the GTM plan needs a full reset.