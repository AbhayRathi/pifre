import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { searchProperties } from "@/lib/db/properties";

const querySchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Query must not be empty")
    .max(200)
    .transform((s) => s.toLowerCase().replace(/[<>"'`;]/g, "")),
});

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? "";
  const parsed = querySchema.safeParse({ q: raw });
  if (!parsed.success) return NextResponse.json({ results: [] });

  try {
    const results = await searchProperties(parsed.data.q);
    return NextResponse.json({ results });
  } catch (err) {
    console.error("[/api/property-search]", err);
    return NextResponse.json({ error: "Search unavailable" }, { status: 503 });
  }
}

