import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { propertyId, question } = (await req.json()) as {
    propertyId: string;
    question: string;
    context?: unknown;
  };

  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        answer: `[AI agent not yet configured] Your question about property ${propertyId}: "${question}" — To enable real AI responses, add OPENAI_API_KEY or ANTHROPIC_API_KEY to your environment.`,
        sources: [],
        confidence: "fallback",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // TODO: wire to OpenAI or Anthropic streaming response
  // TODO: inject property context (scenarios, risks, zoning data) as RAG context
  return new Response("Not yet implemented", { status: 501 });
}
