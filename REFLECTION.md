# Reflection

## 1. The Hardest Bug I Hit This Week

The hardest bug was the duplicate audit results issue on Day 2. When I ran a POST request to /api/audit with Cursor and Claude as inputs, the response came back with three results instead of two — Cursor appeared twice with two different recommendations.

The bug was in the audit engine loop. I had written the cross-tool alternatives check outside the matched flag condition, so it ran for every tool regardless of whether a rule had already matched. My first hypothesis was that the ALTERNATIVES object was being iterated incorrectly. I console.logged the matched variable after the first loop and confirmed it was true for Cursor — meaning a rule had matched — but the alternatives loop was still running and pushing a second result.

The fix was wrapping the alternatives loop inside an if (!matched) block so it only runs when no rule has matched first. Once I made that change and restarted the server, the response came back with exactly two results as expected.

What I learned: when you have sequential conditional logic that builds up an array, always verify with a concrete test case that each item appears exactly once before moving on.

## 2. A Decision I Reversed Mid-Week

I initially planned to use Next.js for the frontend. My reasoning was that Next.js is the industry standard and would look better on the submission. I started setting up the project with Next.js App Router on Day 1.

I reversed this decision after 30 minutes when I realized the App Router added significant complexity for what is essentially a three-page single-page application with no SEO requirements. The audit tool is shared via direct links, not discovered through Google search, so server-side rendering provides no benefit. The file-based routing, server components, and client component boundaries were adding friction without adding value.

I switched to React with Vite which gave me a simpler mental model, faster dev server startup, and straightforward Vercel deployment. I documented this decision in README.md under the Decisions section.

## 3. What I Would Build in Week 2

The first thing I would build is the benchmark mode — showing the user how their AI spend per developer compares to teams of similar size and use case. Right now the audit only tells users if they are on the wrong plan. Benchmark data would tell them if their overall spend level is high even if individual plans are correct. This requires collecting aggregate data from audits and displaying percentile comparisons.

Second I would build the embeddable widget — a script tag that bloggers and newsletter writers could drop into their content. Any article about AI tools or startup costs could embed the audit form inline. This is the highest leverage distribution feature because it puts the tool in front of readers exactly when they are thinking about AI costs.

Third I would add more tools — Notion AI, Perplexity, Midjourney, ElevenLabs — because right now the audit only covers coding and writing tools. Many startups also pay for AI image and voice tools that are not covered.

## 4. How I Used AI Tools

I used Claude as my primary coding assistant throughout the week. I used it for generating boilerplate code, debugging TypeScript errors, and writing the initial structure of complex files like the audit engine and the React pages.

I did not trust Claude with the pricing data. Every price in PRICING_DATA.md was verified manually by visiting each vendor's official pricing page. Claude's training data has a cutoff and pricing changes frequently — relying on it for numbers would have been a mistake.

I also did not trust Claude with the audit logic rules. The conditions for when to recommend a downgrade — for example, Cursor Business for 2 seats being overkill — required me to think through the actual product behavior and user scenarios. Claude can write the code once I know the logic but it cannot decide what the logic should be.

One specific time Claude was wrong: it suggested using import type syntax was optional in NodeNext module resolution. I followed its suggestion and left out the type keyword on an import. This caused a runtime error because NodeNext requires type-only imports to use import type. I caught it when the server crashed on startup and traced it back to the import statement.

## 5. Self-Rating

Discipline: 7 out of 10
I worked consistently across all 7 days and committed daily. I lost half a day to the TypeScript module resolution issues that could have been avoided by reading the tsconfig documentation more carefully upfront.

Code quality: 7 out of 10
The code is readable and well-organized with clear separation between audit engine, routes, controllers, and models. I would improve it by adding input validation middleware and more granular error handling on the client side.

Design sense: 7 out of 10
The UI is clean, dark-themed, and functional. The results page communicates savings clearly. It lacks micro-animations and the mobile experience needs polish before a real launch.

Problem solving: 8 out of 10
I debugged issues methodically — forming a hypothesis, testing it, and fixing the root cause rather than patching symptoms. The duplicate results bug and the CI branch name issue were both solved quickly once I identified the actual cause.

Entrepreneurial thinking: 7 out of 10
I thought carefully about the user, the distribution channels, and the unit economics. The GTM plan is specific and realistic. I would rate myself higher if I had completed the user interviews earlier in the week rather than leaving them to the end.