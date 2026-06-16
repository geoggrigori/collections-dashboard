import { NextRequest, NextResponse } from "next/server";
import { getInvoices } from "@/lib/data";

export function GET(req: NextRequest) {
  const overdueOnly = req.nextUrl.searchParams.get("overdue") === "true";
  return NextResponse.json({ data: getInvoices({ overdueOnly }) });
}
