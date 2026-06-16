import { NextResponse } from "next/server";
import { getCustomers } from "@/lib/data";

export function GET() {
  return NextResponse.json({ data: getCustomers() });
}
