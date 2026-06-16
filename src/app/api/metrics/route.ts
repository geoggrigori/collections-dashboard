import { NextResponse } from "next/server";
import { getMetrics } from "@/lib/data";

export function GET() {
  return NextResponse.json({ data: getMetrics() });
}
