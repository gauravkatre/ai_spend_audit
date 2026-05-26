## Day 1 — 2026-05-20

Hours worked: 2

What I did: Project setup kiya — Set up the project using the MERN stack. Created the Express server, connected to MongoDB Atlas, and built the Audit and Lead models.

What I learned:ts-node does not run directly with nodemon on Windows, so I implemented a workaround.

Blockers / what I'm stuck on:Need to obtain the Gemini API key.

Plan for tomorrow: Work on the audit engine, create API routes, and start building the React form.

## Day 2 — 2026-05-21

Hours worked: 3

What I did: Developed the audit engine with pricing logic for 8 different tools
Integrated Gemini AI for generating automated summaries
Created Audit and Lead API routes
Completed MongoDB models for storing audit and lead data

What I learned:While using NodeNext module system, all imports must include the .js extension
Identified and fixed a duplicate loop issue where a tool was generating multiple results

Blockers / what I'm stuck on:Faced module resolution errors in NodeNext setup (ERR_MODULE_NOT_FOUND) and issues with ESM + TypeScript configuration, but resolved them.

Plan for tomorrow: Start React frontend development

## Day 3 — 2026-05-22

Hours worked: 4

What I did: Built the React frontend — HomePage, AuditPage, and ResultsPage. Set up Zustand store with localStorage persistence. Connected to the backend and tested the full flow — audit submission works, results are displayed with savings breakdown and AI summary.

What I learned:In NodeNext, .js extensions are required in imports even in React files. Also, JSX must have properly closed tags — a single missing tag can break the entire file

Blockers / what I'm stuck on:Lead capture email sending is not implemented yet 

Plan for tomorrow: Set up Resend for email sending, write tests, configure CI/CD, and deploy the application.

## Day 4 — 2026-05-23

Hours worked: 3

What I did: Completed Resend email integration, wrote 7 audit engine tests all passing, set up GitHub Actions CI which is now green.

What I learned: Jest does not run directly on Windows through nodemon path — had to use node_modules/jest/bin/jest.js directly. GitHub Actions was not triggering because local branch was named master instead of main.

Blockers / what I'm stuck on: Deployment is pending.

Plan for tomorrow: Deploy frontend to Vercel, backend to Render, test shareable URL end to end.

## Day 5 — 2026-05-24

Hours worked: 0

Reason: Personal work came up, could not dedicate time to the project today.

## Day 6 — 2026-05-25

Hours worked: 0

Reason: Personal work continued, no progress today.

## Day 7 — 2026-05-26

Hours worked: 4

What I did: Deployed backend to Render and frontend to Vercel. Fixed CORS trailing slash issue that was blocking API calls in production. All MD files completed — ARCHITECTURE, PRICING_DATA, PROMPTS, TESTS, README, REFLECTION, GTM, ECONOMICS, LANDING COPY, METRICS, USER INTERVIEWS.

What I learned: CORS origin must match exactly — a trailing slash in the allowed origin string causes preflight to fail even though the URLs look the same visually.

Blockers / what I'm stuck on: Screenshots for README still pending.

Plan for tomorrow: Take screenshots, add to repo, final review of all files, check git log for 5+ distinct days.


