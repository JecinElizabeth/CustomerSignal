"use client";

import { useState } from "react";
import Link from "next/link";
import type { Segment, SegmentStats } from "@/types";
import { toCsv } from "@/lib/csv";

const ACTIONS: Record<Segment, { action: string; question: string; measure: string }> = {
  Champions: { action: "Invite a loyal-customer feedback conversation", question: "What keeps you coming back, and what could be easier?", measure: "Track feedback themes and review replies" },
  "Loyal Customers": { action: "Explain the next loyalty milestone", question: "Do you understand your current benefits and next tier?", measure: "Review benefit questions and repeat engagement" },
  "At Risk": { action: "Ask about friction before offering a discount", question: "Was there a product, delivery, or support issue we can resolve?", measure: "Log the issue, owner, and agreed follow-up" },
  "New Customers": { action: "Share a short onboarding checklist", question: "Did you find what you needed after your first purchase?", measure: "Check completion of each onboarding step" },
  Hibernating: { action: "Check relevance and contact preference", question: "Would an update be useful, or would you prefer fewer messages?", measure: "Record consent and stop unwanted follow-ups" },
};

export function PlaybookClient({ segments }: { segments: SegmentStats[] }) {
  const [selected, setSelected] = useState<Segment>("At Risk");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const cohort = segments.find((item) => item.segment === selected)!;
  const plan = ACTIONS[selected];

  function download() {
    const rows = [
      ["Dataset", "Segment", "Customers", "Recommended action", "Discovery question", "Follow-up", "Preparation note"],
      ["Synthetic portfolio demo", selected, String(cohort.count), plan.action, plan.question, plan.measure, note],
    ];
    const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "customer-signal-playbook.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Playbook exported. No messages were sent.");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-9 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-700">Customer conversation planning</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">Turn a segment into a useful next step.</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">Use the demo audience as evidence, choose a helpful conversation, and prepare a clear handoff. These suggestions are fixed playbook rules, not model predictions or promised revenue.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-[270px_1fr]">
        <section className="rounded-xl border border-stone-200 bg-white p-5">
          <label htmlFor="cohort" className="text-sm font-semibold">Audience</label>
          <select id="cohort" value={selected} onChange={(event) => { setSelected(event.target.value as Segment); setStatus(""); }} className="mt-3 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm">
            {segments.map((item) => <option key={item.segment}>{item.segment}</option>)}
          </select>
          <p className="mt-6 text-4xl font-semibold tabular-nums">{cohort.count}</p>
          <p className="mt-1 text-sm text-stone-500">synthetic customers in this cohort</p>
          <p className="mt-5 border-t border-stone-100 pt-4 text-xs leading-5 text-stone-500">The demo assigns profiles from predefined RFM ranges. It does not calculate transaction-derived quintiles.</p>
          <Link href="/segments" className="mt-4 inline-block text-sm font-medium text-blue-700 underline underline-offset-4">Inspect the segment evidence</Link>
        </section>
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="border-b border-blue-100 bg-blue-50 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Suggested next action</p>
            <h2 className="mt-2 text-xl font-semibold">{plan.action}</h2>
          </div>
          <div className="space-y-6 p-6">
            <div><h3 className="text-sm font-semibold">Start with a question</h3><p className="mt-2 text-sm leading-6 text-stone-600">{plan.question}</p></div>
            <div><h3 className="text-sm font-semibold">Close the loop</h3><p className="mt-2 text-sm leading-6 text-stone-600">{plan.measure}. An owner should review the brief before any real customer contact.</p></div>
            <div><label htmlFor="note" className="text-sm font-semibold">Preparation note</label><textarea id="note" value={note} maxLength={500} onChange={(event) => setNote(event.target.value)} placeholder="Add a sample owner, next question, or follow-up date. Avoid personal customer information." className="mt-2 min-h-24 w-full rounded-md border border-stone-300 p-3 text-sm" /><p className="mt-1 text-xs text-stone-500">This note stays on this page until exported; it is not saved to a server.</p></div>
            <div className="flex flex-wrap items-center gap-4"><button onClick={download} className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Export conversation plan</button><Link href="/copilot" className="text-sm font-medium underline underline-offset-4">Open campaign composer</Link></div>
            <p role="status" className="min-h-5 text-sm text-emerald-800">{status}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
