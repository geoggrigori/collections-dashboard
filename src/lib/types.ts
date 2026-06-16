export type CustomerStatus = "active" | "on_hold" | "delinquent";

export interface Customer {
  id: number;
  name: string;
  status: CustomerStatus;
  credit_limit_cents: number;
  outstanding_balance_cents: number;
  available_credit_cents: number;
}

export type InvoiceStatus =
  | "open"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "void";

export interface Invoice {
  id: number;
  customer_id: number;
  customer_name: string;
  invoice_number: string;
  amount_cents: number;
  balance_cents: number;
  due_date: string; // ISO date
  status: InvoiceStatus;
  overdue: boolean;
}

export interface Metrics {
  customers: number;
  outstanding_cents: number;
  overdue_cents: number;
  overdue_count: number;
  collected_30d_cents: number;
}

export interface MatchResult {
  invoice_numbers: string[];
  confidence: number;
  source: "llm" | "heuristic";
  reasoning: string;
}
