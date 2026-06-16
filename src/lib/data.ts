import type {
  Customer,
  Invoice,
  InvoiceStatus,
  MatchResult,
  Metrics,
} from "./types";

// Conjunto de dados de demonstracao que espelha o shape da Collections API
// (Rails). Determinístico, calculado a partir da data atual para que faturas
// "vencidas" continuem fazendo sentido com o tempo.

const today = () => new Date();

function daysFromNow(days: number): string {
  const d = today();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

interface Seed {
  name: string;
  status: Customer["status"];
  credit: number;
  invoices: Array<{
    n: string;
    amount: number;
    balance: number;
    due: number; // dias relativos a hoje
    status: InvoiceStatus;
  }>;
}

const SEEDS: Seed[] = [
  {
    name: "Atlas Building Supply",
    status: "active",
    credit: 500_00 * 100,
    invoices: [
      { n: "INV-1001", amount: 12_400_00, balance: 0, due: -20, status: "paid" },
      { n: "INV-1002", amount: 8_900_00, balance: 8_900_00, due: 12, status: "open" },
    ],
  },
  {
    name: "Northwind Distributors",
    status: "delinquent",
    credit: 200_000_00,
    invoices: [
      { n: "INV-1010", amount: 34_500_00, balance: 34_500_00, due: -45, status: "overdue" },
      { n: "INV-1011", amount: 15_000_00, balance: 7_500_00, due: -8, status: "partially_paid" },
    ],
  },
  {
    name: "Cedar & Stone Wholesale",
    status: "active",
    credit: 1_000_000_00,
    invoices: [
      { n: "INV-1020", amount: 52_000_00, balance: 52_000_00, due: 25, status: "open" },
      { n: "INV-1021", amount: 9_300_00, balance: 9_300_00, due: -3, status: "overdue" },
    ],
  },
  {
    name: "Pioneer Plumbing Co.",
    status: "on_hold",
    credit: 150_000_00,
    invoices: [
      { n: "INV-1030", amount: 21_750_00, balance: 21_750_00, due: -60, status: "overdue" },
    ],
  },
  {
    name: "Summit Electrical Supply",
    status: "active",
    credit: 750_000_00,
    invoices: [
      { n: "INV-1040", amount: 18_200_00, balance: 0, due: -15, status: "paid" },
      { n: "INV-1041", amount: 41_600_00, balance: 41_600_00, due: 8, status: "open" },
      { n: "INV-1042", amount: 6_450_00, balance: 6_450_00, due: -1, status: "overdue" },
    ],
  },
  {
    name: "Harbor Industrial Parts",
    status: "active",
    credit: 300_000_00,
    invoices: [
      { n: "INV-1050", amount: 27_900_00, balance: 13_950_00, due: 5, status: "partially_paid" },
    ],
  },
];

let CACHE: { customers: Customer[]; invoices: Invoice[] } | null = null;

function build() {
  if (CACHE) return CACHE;

  const customers: Customer[] = [];
  const invoices: Invoice[] = [];
  let invoiceId = 1;

  SEEDS.forEach((seed, idx) => {
    const customerId = idx + 1;
    let outstanding = 0;

    seed.invoices.forEach((inv) => {
      outstanding += inv.balance;
      const dueIso = daysFromNow(inv.due);
      const isOverdue =
        inv.balance > 0 && new Date(dueIso) < today() && inv.status !== "paid";
      invoices.push({
        id: invoiceId++,
        customer_id: customerId,
        customer_name: seed.name,
        invoice_number: inv.n,
        amount_cents: inv.amount,
        balance_cents: inv.balance,
        due_date: dueIso,
        status: inv.status,
        overdue: isOverdue,
      });
    });

    customers.push({
      id: customerId,
      name: seed.name,
      status: seed.status,
      credit_limit_cents: seed.credit,
      outstanding_balance_cents: outstanding,
      available_credit_cents: seed.credit - outstanding,
    });
  });

  CACHE = { customers, invoices };
  return CACHE;
}

export function getCustomers(): Customer[] {
  return build().customers;
}

export function getInvoices(opts?: { overdueOnly?: boolean }): Invoice[] {
  const all = build().invoices;
  return opts?.overdueOnly ? all.filter((i) => i.overdue) : all;
}

export function getMetrics(): Metrics {
  const { customers, invoices } = build();
  const unpaid = invoices.filter((i) => i.balance_cents > 0);
  const overdue = invoices.filter((i) => i.overdue);
  const collected = invoices.reduce(
    (sum, i) => sum + (i.amount_cents - i.balance_cents),
    0,
  );
  return {
    customers: customers.length,
    outstanding_cents: unpaid.reduce((s, i) => s + i.balance_cents, 0),
    overdue_cents: overdue.reduce((s, i) => s + i.balance_cents, 0),
    overdue_count: overdue.length,
    collected_30d_cents: collected,
  };
}

// Heuristica de remittance matching: casa numeros de fatura citados no texto
// com as faturas em aberto do cliente. (No backend Rails, um LLM faz isso
// quando ha chave de API; aqui reproduzimos o fallback deterministico.)
export function matchRemittance(customerId: number, text: string): MatchResult {
  const open = build().invoices.filter(
    (i) => i.customer_id === customerId && i.balance_cents > 0,
  );
  const found = open
    .map((i) => i.invoice_number)
    .filter((n) => text.toUpperCase().includes(n.toUpperCase()));

  return {
    invoice_numbers: found,
    confidence: found.length > 0 ? 0.6 : 0,
    source: "heuristic",
    reasoning:
      found.length > 0
        ? `Found ${found.length} invoice number(s) referenced in the text.`
        : "No invoice numbers recognized — flagged for manual review.",
  };
}
