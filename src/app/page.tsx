import { getMetrics, getCustomers, getInvoices } from "@/lib/data";
import { formatUSD, formatDate } from "@/lib/format";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { RemittanceDemo } from "@/components/RemittanceDemo";

export default function Page() {
  const metrics = getMetrics();
  const customers = getCustomers();
  const invoices = getInvoices();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Collections Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Accounts-receivable overview for distributors — front-end for the{" "}
          <a
            href="https://github.com/geoggrigori/collections-api"
            className="font-medium text-violet-600 hover:underline"
          >
            Collections API
          </a>{" "}
          (Rails).
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Open receivables"
          value={formatUSD(metrics.outstanding_cents)}
          accent
        />
        <MetricCard
          label="Overdue"
          value={formatUSD(metrics.overdue_cents)}
          hint={`${metrics.overdue_count} invoices`}
        />
        <MetricCard label="Customers" value={String(metrics.customers)} />
        <MetricCard
          label="Collected"
          value={formatUSD(metrics.collected_30d_cents)}
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Customers
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="py-2 text-slate-700">{c.name}</td>
                  <td className="py-2">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-2 text-right tabular-nums text-slate-700">
                    {formatUSD(c.outstanding_balance_cents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <RemittanceDemo customers={customers} />
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Invoices</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="pb-2 font-medium">Invoice</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Due</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 text-right font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr
                key={i.id}
                className={`border-t border-slate-100 ${
                  i.overdue ? "bg-rose-50/50" : ""
                }`}
              >
                <td className="py-2 font-medium text-slate-700">
                  {i.invoice_number}
                </td>
                <td className="py-2 text-slate-500">{i.customer_name}</td>
                <td className="py-2 text-slate-500">{formatDate(i.due_date)}</td>
                <td className="py-2">
                  <StatusBadge status={i.overdue ? "overdue" : i.status} />
                </td>
                <td className="py-2 text-right tabular-nums text-slate-700">
                  {formatUSD(i.balance_cents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        Demo data. Set <code>NEXT_PUBLIC_API_URL</code> to connect the live
        Collections API.
      </footer>
    </main>
  );
}
