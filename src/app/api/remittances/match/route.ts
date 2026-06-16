import { NextRequest, NextResponse } from "next/server";
import { matchRemittance } from "@/lib/data";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.customer_id !== "number") {
    return NextResponse.json(
      { error: { code: "bad_request", message: "customer_id is required" } },
      { status: 400 },
    );
  }
  const result = matchRemittance(body.customer_id, String(body.text ?? ""));
  return NextResponse.json({ data: result });
}
