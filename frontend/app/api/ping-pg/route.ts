import { NextRequest, NextResponse } from "next/server";

import { getLawyersInfo } from "@/actions/lawyer.action";

export async function GET(request: NextRequest) {
  const lawyerInfo = await getLawyersInfo();
  return NextResponse.json(lawyerInfo, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
