## Automated Tests

All tests are in the audit engine test suite. Run with:

cd server
npm test

## Test File

File: server/src/tests/auditEngine.test.ts
Runner: Jest with ts-jest
Coverage: Audit engine logic — plan rules, savings calculation, cross-tool alternatives

## Test Cases

Test 1: Cursor Business with 2 seats should recommend downgrade to Pro
File: auditEngine.test.ts
What it covers: Business plan overkill rule for small teams. Verifies recommendation text and savings amount ($40).

Test 2: Claude Max with 1 seat should recommend downgrade to Pro
File: auditEngine.test.ts
What it covers: Claude Max rule for single users. Verifies 80% savings calculation ($80 saved from $100).

Test 3: GitHub Copilot Business with 2 seats should recommend Individual plan
File: auditEngine.test.ts
What it covers: Copilot Business to Individual downgrade rule for teams under 4. Verifies savings greater than 0.

Test 4: Total monthly and annual savings should be calculated correctly
File: auditEngine.test.ts
What it covers: Aggregation logic — multiple tools combined. Cursor ($40) + Claude ($80) = $120/mo, $1440/year.

Test 5: Well-optimized spend should return 0 savings
File: auditEngine.test.ts
What it covers: Happy path for already-optimal spend. Verifies savings is 0 and recommendation is "No changes needed".

Test 6: Having both Claude and ChatGPT should recommend consolidation
File: auditEngine.test.ts
What it covers: Cross-tool alternative logic. Two overlapping LLMs should trigger consolidation recommendation.

Test 7: Gemini Ultra with 2 seats should recommend Pro plan
File: auditEngine.test.ts
What it covers: Gemini Ultra downgrade rule for small teams. Verifies recommendation and savings greater than 0.

## How to Run

cd server
npm test

Expected output: 7 passed, 7 total