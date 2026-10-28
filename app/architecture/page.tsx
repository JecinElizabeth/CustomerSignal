import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Gauge,
  LayoutDashboard,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

type Stage = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

const DATA_FLOW: Stage[] = [
  {
    label: "Seeded customer profiles",
    detail: "A deterministic generator creates the same 200 demo customers from predefined segment profiles.",
    icon: Database,
  },
  {
    label: "RFM profile ranges",
    detail: "Each profile supplies allowed recency, frequency, and monetary score ranges plus its segment label.",
    icon: Gauge,
  },
  {
    label: "Server components",
    detail: "Next.js computes summaries on the server and sends ready-to-render HTML to the browser.",
    icon: ServerCog,
  },
  {
    label: "Decision surfaces",
    detail: "The dashboard, segment ledger, and loyalty view turn those scores into business actions.",
    icon: LayoutDashboard,
  },
];

const CAMPAIGN_FLOW: Stage[] = [
  {
    label: "Brief",
    detail: "A user selects a segment, objective, channel, and optional offer.",
    icon: LayoutDashboard,
  },
  {
    label: "Validate",
    detail: "Zod rejects unknown values, oversized input, and malformed request bodies.",
    icon: ShieldCheck,
  },
  {
    label: "Generate",
    detail: "The server calls Groq when configured or uses a labelled fallback template offline.",
    icon: BrainCircuit,
  },
  {
    label: "Screen and return",
    detail: "Unsafe output is discarded before the campaign artifact reaches the interface.",
    icon: ShieldCheck,
  },
];

function Flow({ title, stages }: { title: string; stages: Stage[] }) {
  return (
    <section className="rounded-[10px] border border-stone-200 bg-white">
      <div className="border-b border-stone-200 px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-stone-900">{title}</h2>
      </div>
      <ol className="grid gap-0 lg:grid-cols-4">
        {stages.map(({ label, detail, icon: Icon }, index) => (
          <li
            key={label}
            className="relative border-b border-stone-100 p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[11px] text-stone-400">
                STEP {String(index + 1).padStart(2, "0")}
              </span>
              <Icon aria-hidden size={17} strokeWidth={1.5} className="text-stone-500" />
            </div>
            <h3 className="text-[14px] font-semibold text-stone-900">{label}</h3>
            <p className="mt-2 text-[13px] leading-5 text-stone-600">{detail}</p>
            {index < stages.length - 1 ? (
              <ArrowRight
                aria-hidden
                size={14}
                className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-white text-stone-400 lg:block"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-500">
          Engineering walkthrough
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
          Follow one customer record through the system.
        </h1>
        <p className="mt-3 text-[14px] leading-6 text-stone-600">
          CustomerSignal keeps analytics deterministic and keeps model calls behind a validated server
          boundary. This map shows what runs where, what can fail, and how the app still works
          without an API key.
        </p>
      </header>

      <Flow title="Analytics path" stages={DATA_FLOW} />
      <Flow title="Campaign request path" stages={CAMPAIGN_FLOW} />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Frontend", "React client components handle only interactive state; server components render the data-heavy views."],
          ["Backend boundary", "The Next.js API route owns validation, rate limits, provider access, and output screening."],
          ["Graceful failure", "Missing keys and provider failures return labelled local templates instead of breaking the workflow."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-[10px] border border-stone-200 bg-white p-5">
            <h2 className="text-[13px] font-semibold text-stone-900">{title}</h2>
            <p className="mt-2 text-[13px] leading-5 text-stone-600">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
