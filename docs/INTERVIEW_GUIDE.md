# CustomerSignal interview guide

## 30-second explanation

CustomerSignal is a Next.js customer-intelligence dashboard built around deterministic demo customer profiles. It presents profile-based RFM segments, loyalty metrics, campaign briefs, and an exportable retention playbook. Most analytics run without an API key. A protected server route optionally calls an LLM, validates the request, rate-limits callers, screens the result, and falls back to local templates when the provider is unavailable.

## Architecture in one minute

1. `lib/mock-data.ts` creates a deterministic customer dataset from predefined segment profiles.
2. Each profile supplies allowed Recency, Frequency, and Monetary score ranges plus a segment label; the demo does not calculate live quintile boundaries from transactions.
3. Next.js server components aggregate the data for the dashboard, segments, and loyalty pages.
4. Client components are used only for interactions such as charts, campaign forms, and customer lookup.
5. `app/api/generate-campaign/route.ts` is the backend boundary for optional AI generation.
6. Zod validation, request-size limits, sanitization, rate limiting, and output screening protect that boundary.
7. If no key is configured, the API returns a clearly labelled deterministic template.

## Files to know

- `lib/mock-data.ts`: seeded data, RFM scores, and aggregates.
- `app/dashboard/page.tsx`: server-rendered overview.
- `components/copilot/CopilotClient.tsx`: campaign-form state.
- `app/api/generate-campaign/route.ts`: validation and provider boundary.
- `lib/rate-limit.ts`: request controls.
- `app/architecture/page.tsx`: visual system walkthrough added in this learning edition.

## Likely interview questions

### Why use deterministic data?

It makes the demo repeatable, prevents server/client hydration differences, and lets an interviewer verify calculations against the same input.

### Why keep the provider call on the server?

The API key must not reach the browser. The server also provides one place for validation, rate limiting, timeouts, and fallback behavior.

### What is RFM?

RFM means Recency, Frequency, and Monetary value. Customers receive a score for how recently they purchased, how often they purchase, and how much they spend. The combined scores assign customers to understandable cohorts such as champions or at-risk customers.

### What would you change for production data?

Add authentication, a database, tenant isolation, background ingestion, distributed rate limiting, audit logs, and tests around data access. The current repository is deliberately a demo-data application.

### What did this learning edition add?

It added the in-app System Map and this concise interview walkthrough to the independently maintained team-project repository.

## Five-minute revision checklist

- Explain RFM without looking at the README.
- Trace a campaign from form submission to fallback response.
- Name one frontend component and one backend boundary.
- Explain why the API key stays server-side.
- State the limitation: the customer records are deterministic demo data, not production data.
