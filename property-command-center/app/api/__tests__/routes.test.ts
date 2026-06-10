import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../agent/route";

// Isolate env so tests don't depend on real API keys
beforeEach(() => {
  vi.unstubAllEnvs();
});

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/agent", () => {
  describe("request validation", () => {
    it("returns 400 when body is empty", async () => {
      const req = new NextRequest("http://localhost/api/agent", {
        method: "POST",
        body: "{}",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Invalid request");
    });

    it("returns 400 when propertyId is missing", async () => {
      const res = await POST(makeRequest({ question: "What is the zoning?" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when question is missing", async () => {
      const res = await POST(makeRequest({ propertyId: "prop-123" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when propertyId exceeds max length", async () => {
      const res = await POST(makeRequest({ propertyId: "a".repeat(101), question: "Q?" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when question exceeds max length", async () => {
      const res = await POST(makeRequest({ propertyId: "prop-1", question: "Q".repeat(1001) }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for malformed JSON", async () => {
      const req = new NextRequest("http://localhost/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-valid-json",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });

  describe("no AI key configured", () => {
    it("returns a placeholder response with isPlaceholder: true", async () => {
      vi.stubEnv("OPENAI_API_KEY", "");
      vi.stubEnv("ANTHROPIC_API_KEY", "");
      const res = await POST(
        makeRequest({ propertyId: "prop-1", question: "Should I buy this?" })
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.isPlaceholder).toBe(true);
      expect(json.confidence).toBe("low");
      expect(Array.isArray(json.sources)).toBe(true);
      expect(typeof json.answer).toBe("string");
    });

    it("placeholder answer references the property id", async () => {
      vi.stubEnv("OPENAI_API_KEY", "");
      vi.stubEnv("ANTHROPIC_API_KEY", "");
      const res = await POST(
        makeRequest({ propertyId: "oakland-123", question: "What is the ROI?" })
      );
      const json = await res.json();
      expect(json.answer).toContain("oakland-123");
    });
  });

  describe("AI key present but streaming not implemented", () => {
    it("returns a labelled placeholder — never 501", async () => {
      vi.stubEnv("OPENAI_API_KEY", "sk-test-key");
      const res = await POST(
        makeRequest({ propertyId: "prop-1", question: "What is the zoning?" })
      );
      expect(res.status).toBe(200);
      expect(res.status).not.toBe(501);
      const json = await res.json();
      expect(json.isPlaceholder).toBe(true);
    });

    it("placeholder answer references the question", async () => {
      vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-test");
      const res = await POST(
        makeRequest({ propertyId: "prop-2", question: "Is this flood zone?" })
      );
      const json = await res.json();
      expect(json.answer).toContain("Is this flood zone?");
    });
  });
});
