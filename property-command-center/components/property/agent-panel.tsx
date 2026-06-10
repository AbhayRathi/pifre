"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AgentPanelProps {
  propertyAddress: string;
  propertyId?: string;
  propertyContext?: unknown;
}

const suggestedPrompts = [
  "Compare the max-yield and affordable scenarios.",
  "What should we verify first?",
  "What makes this property risky?",
  "Generate a lender-ready summary.",
  "Make this concept more affordable.",
  "What if we add one ADU?",
];

const cannedResponses: Record<string, string> = {
  "Compare the max-yield and affordable scenarios.":
    "The Max Yield scenario targets maximum density (4-6+ units) with higher returns but significantly more risk — entitlement uncertainty, larger capital requirement, and longer timelines. The Affordable scenario leverages density bonus and tax credits to achieve similar or greater unit counts with de-risked approvals, but lower direct margins. For a first project, the affordable path may actually close faster due to streamlined approvals. I'd recommend modeling both capital stacks in detail.",
  "What should we verify first?":
    "Priority verification order: 1) Confirm zoning classification directly with Planning Department — this determines everything. 2) Order preliminary title report to identify any encumbrances, easements, or deed restrictions. 3) Get lot dimensions confirmed via survey or assessor records. 4) Check permit history for any outstanding violations or conditions. 5) Run Phase I ESA if any commercial/industrial history. Start these before spending on architecture.",
  "What makes this property risky?":
    "Key risk factors: Data confidence is low — we're working with fallback data that needs verification. Zoning interpretation may differ from mapped classification. Unknown site conditions (environmental, structural). Market timing uncertainty. Permitting timelines in this jurisdiction can be unpredictable. The biggest single risk is proceeding with unverified assumptions. Recommend spending $5-10K on due diligence before any purchase commitment.",
  "Generate a lender-ready summary.":
    "I can structure a lender summary from the current data, but note: lenders will require verified information (appraisal, survey, title, environmental). The current brief provides a strong starting point for initial conversations, but should be presented as 'preliminary analysis pending due diligence.' Would you like me to format the Executive Summary + Cost/Revenue section in a lender-facing format?",
  "Make this concept more affordable.":
    "To improve affordability outcomes: 1) Include 20%+ affordable units to trigger density bonus (up to 50% more units by-right). 2) Explore LIHTC 4% credits for acquisition/rehab or 9% for new construction. 3) Apply for local inclusionary housing funds. 4) Consider community land trust partnership for land cost reduction. 5) Use modular/prefab construction to reduce hard costs 15-25%. 6) Pursue AB 2011 or SB 35 for ministerial approval (no CEQA, no public hearing).",
  "What if we add one ADU?":
    "Adding one ADU (accessory dwelling unit) under California AB 68/SB 13: Typical 600-1000sf detached unit in rear yard. Cost estimate: $200-350K depending on finishes and site conditions. Monthly rent potential: $2,000-3,200 in this market. Timeline: 4-8 months (streamlined permitting — no discretionary review required). ROI is strong for cashflow strategy. This can be done simultaneously with main structure improvements and doesn't require any zoning variance.",
};

export function AgentPanel({ propertyAddress, propertyId, propertyContext }: AgentPanelProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "agent"; content: string; confidence?: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (prompt: string) => {
    const userMessage = prompt || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      if (propertyId) {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId, question: userMessage, context: propertyContext }),
          signal: AbortSignal.timeout(10000),
        });

        if (res.ok) {
          const data = (await res.json()) as { answer: string; confidence: string };
          setMessages((prev) => [...prev, { role: "agent", content: data.answer, confidence: data.confidence }]);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fall through to canned responses
    }

    // Fallback to canned responses
    const response =
      cannedResponses[userMessage] ||
      `I'm analyzing "${userMessage}" for ${propertyAddress}. In the full version, I'll pull from verified source records, scenario models, and risk assessments to provide a grounded answer. For now, this is a placeholder response — but the architecture is ready for real AI integration with source citations.`;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "agent", content: response, confidence: "fallback" }]);
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-copper-500 to-copper-700 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">AI</span>
          </div>
          <CardTitle className="text-sm">Intelligence Agent</CardTitle>
          <span className="text-[9px] text-ivory-500 bg-graphite-700 px-1.5 py-0.5 rounded">prototype</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-ivory-400">Ask me about this property. Try:</p>
              <div className="grid gap-1.5">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    aria-label={`Ask: ${prompt}`}
                    className="text-left text-[11px] text-ivory-400 hover:text-copper-300 px-2 py-1.5 rounded-md hover:bg-graphite-700/50 transition-colors border border-transparent hover:border-graphite-600/50"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-xs leading-relaxed p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-copper-600/10 text-ivory-200 border border-copper-600/20 ml-4"
                  : "bg-graphite-700/50 text-ivory-300 border border-graphite-600/30 mr-4"
              }`}
            >
              {msg.content}
              {msg.role === "agent" && msg.confidence === "fallback" && (
                <Badge variant="fallback" className="mt-1 text-[8px]">
                  AI responses are illustrative
                </Badge>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-xs text-ivory-500 p-2 animate-pulse">Thinking...</div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 pt-2 border-t border-graphite-700">
          <Input
            className="text-xs h-8"
            placeholder="Ask about this property..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          />
          <Button size="sm" className="h-8 text-xs" aria-label="Send message" onClick={() => handleSend(input)}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
