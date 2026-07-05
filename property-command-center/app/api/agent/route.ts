import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const agentSchema = z.object({
  propertyId: z.string().min(1).max(100),
  question: z.string().trim().min(1).max(1000),
  context: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => ({}));
  const parsed = agentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { propertyId, question } = parsed.data;

  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      answer:
        `[AI assistant not configured] Question received: "${question}". ` +
        `To activate AI-powered analysis for property ${propertyId}, ` +
        `add OPENAI_API_KEY or ANTHROPIC_API_KEY to your environment variables. ` +
        `Until then, all scenario, risk, and financial analysis is available in the ` +
        `Scenarios, Risk Register, and Report tabs above.`,
      sources: [],
      confidence: "low" as const,
      isPlaceholder: true,
    });
  }

  // AI key present but streaming not yet implemented — return labelled placeholder
  return NextResponse.json({
    answer: `AI provider is configured. Streaming analysis for property ${propertyId} is in active development. Question received: "${question}"`,
    sources: [],
    confidence: "low" as const,
    isPlaceholder: true,
  });
}

