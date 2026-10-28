# CustomerSignal: 45-minute first walkthrough

## Learn the business story: 10 minutes

An online store sees different customer behavior. A new buyer may need onboarding; a loyal buyer may need a clear explanation of benefits; a customer who stopped returning may have an unresolved issue. The dashboard helps someone choose a useful next conversation.

RFM means recency (how recently someone bought), frequency (how often) and monetary value (spend). This demo assigns customers from predefined profiles; it does not calculate scores from a real transaction database.

## Run the app and demonstrate it: 10 minutes

1. Run the README commands. Open Overview and identify the demo-data banner.
2. Open Segments and find the At Risk cohort.
3. Open Playbook and choose At Risk.
4. Read the proposed discovery question. Add a sample follow-up note.
5. Export the plan and inspect the CSV.
6. Open Campaigns and request a draft. Without a key, it returns a labelled template.

No message is sent. The campaign's open-rate range is illustrative, not a measured result.

## Read one complete path: 15 minutes

Open `app/playbook/page.tsx`: the server passes segment summaries to the interactive component.

Open `components/PlaybookClient.tsx`: a dropdown changes the selected cohort. The current count and next action are derived from that selection. A text area holds a preparation note. The export button creates rows and downloads a CSV.

Open `lib/csv.ts`: commas, quotes and newlines are escaped. Formula-like cell prefixes are neutralized so spreadsheet software does not treat a note as a formula.

Open `app/api/generate-campaign/route.ts`: the browser sends a POST request. Zod validates allowed values and length. The route uses a local template when no provider key is available. This is a server boundary: a secret key never needs to be placed in the browser.

## Prepare an explanation: 10 minutes

“CustomerSignal is a team portfolio dashboard for exploring synthetic customer segments and planning retention conversations. Its Playbook turns one segment into a question, next action and exportable handoff. The analytics are deterministic; the optional campaign API validates requests and can fall back to a labelled local template.”

Be able to answer:

- What problem does each screen solve?
- Which values are synthetic?
- Why does the API key stay on the server?
- What happens without a provider key?
- Why is CSV escaping necessary?
- What would production use require?

Before describing an individual contribution, personally run the demo, change one playbook action, run the checks and explain the resulting diff. A repository link demonstrates the artifact; it does not establish mastery of every dependency.
