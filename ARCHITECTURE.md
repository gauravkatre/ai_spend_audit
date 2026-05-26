## Architecture Overview

SpendSmart AI is a MERN stack web application that audits AI tool spend for startup teams.

## System Diagram

\`\`\`mermaid
graph TD
    A[User Browser] -->|Fills audit form| B[React Frontend - Vite]
    B -->|POST /api/audit| C[Express Server]
    C -->|runAuditEngine| D[Audit Engine]
    D -->|Returns results| C
    C -->|generateAISummary| E[Gemini API]
    E -->|AI paragraph| C
    C -->|Save audit| F[MongoDB Atlas]
    C -->|Returns shareId + results| B
    B -->|Navigate to results| G[Results Page]
    G -->|User submits email| H[POST /api/leads]
    H -->|Save lead| F
    H -->|sendAuditEmail| I[Resend API]
    I -->|Confirmation email| J[User Inbox]
\`\`\`

## Data Flow

1. User selects AI tools, enters plan, monthly spend, seats, team size, use case
2. React frontend sends POST /api/audit to Express server
3. Audit Engine evaluates each tool against hardcoded pricing rules
4. If overspend detected, savings and recommendation are calculated
5. Gemini API generates a personalized 100-word summary paragraph
6. Audit saved to MongoDB with a unique 8-character shareId
7. Frontend redirects to /results/:shareId
8. User optionally submits email — lead saved to MongoDB, confirmation email sent via Resend

## Stack Choices

Frontend: React + Vite + TypeScript
Chosen over Next.js because this is a single-page audit tool with no SEO requirements. Vite gives faster dev builds and simpler deployment to Vercel.

Backend: Node.js + Express + TypeScript
Straightforward REST API. No GraphQL needed for this use case — 2 endpoints only.

Database: MongoDB Atlas
Flexible schema for audit results which vary by number of tools selected. Free tier sufficient for MVP.

AI: Gemini 1.5 Flash
Free tier available, fast response time, sufficient for 100-word summaries. Fallback template handles API failures gracefully.

Email: Resend
Simple API, generous free tier (3000 emails/month), excellent deliverability.

State Management: Zustand with localStorage persistence
Lightweight alternative to Redux. Form state persists across page reloads as required.

## Scaling to 10k Audits Per Day

1. Add Redis caching for identical audit inputs — same tool/plan/seats combo returns cached result
2. Move Gemini summary generation to a background job queue (BullMQ) — return audit instantly, summary loads async
3. Add MongoDB indexes on shareId and createdAt fields
4. Horizontal scaling on Render with multiple Express instances behind a load balancer
5. Rate limiting tightened from 100 to 20 requests per 15 minutes per IP