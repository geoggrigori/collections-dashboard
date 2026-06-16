"use client";

import { useState } from "react";
import type { Customer, MatchResult } from "@/lib/types";

const SAMPLE =
  "Hi, please find attached payment covering invoices INV-1010 and also INV-1011. Thanks!";

export function RemittanceDemo({ customers }: { customers: Customer[] }) {
  const [customerId, setCustomerId] = useState(customers[1]?.id ?? customers[0].id);
  const [text, setText] = useState(SAMPLE);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/remittances/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId, text }),
      });
      const json = await res.json();
      setResult(json.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Remittance matching
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Paste a free-text payment note. The matcher links it to the customer&apos;s
        open invoices (LLM in the API; deterministic heuristic in this demo).
      </p>

      <div className="mt-4 grid gap-3">
        <label className="text-sm font-medium text-slate-600">
          Customer
          <select
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-600">
          Remittance text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <button
          onClick={run}
          disabled={loading}
          className="w-fit rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "Matching…" : "Match invoices"}
        </button>
      </div>

      {result && (
        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-slate-700">Matched:</span>
            {result.invoice_numbers.length > 0 ? (
              result.invoice_numbers.map((n) => (
                <span
                  key={n}
                  className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700"
                >
                  {n}
                </span>
              ))
            ) : (
              <span className="text-slate-400">none</span>
            )}
          </div>
          <p className="mt-2 text-slate-500">
            confidence {(result.confidence * 100).toFixed(0)}% · source{" "}
            {result.source}
          </p>
          <p className="mt-1 text-slate-500">{result.reasoning}</p>
        </div>
      )}
    </div>
  );
}
