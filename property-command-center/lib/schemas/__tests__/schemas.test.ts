import { describe, it, expect } from "vitest";
import { propertyRecordSchema } from "../property";
import { scenarioSchema } from "../scenario";
import { riskSchema } from "../risk";
import { reportSchema } from "../report";
import { sourceRecordSchema, confidenceSchema } from "../source";

describe("PropertyRecord schema", () => {
  const validProperty = {
    id: "test-id",
    address: "123 Main St",
    city: "Oakland",
    state: "CA",
    sourceRecords: [],
    dataQuality: "real",
  };

  it("parses a valid object successfully", () => {
    const result = propertyRecordSchema.safeParse(validProperty);
    expect(result.success).toBe(true);
  });

  it("throws on missing required fields", () => {
    const result = propertyRecordSchema.safeParse({ id: "test" });
    expect(result.success).toBe(false);
  });

  it("throws on wrong field types", () => {
    const result = propertyRecordSchema.safeParse({
      ...validProperty,
      lotSizeSqFt: "not a number",
    });
    expect(result.success).toBe(false);
  });

  it("parses optional fields as undefined when omitted", () => {
    const result = propertyRecordSchema.safeParse(validProperty);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.county).toBeUndefined();
      expect(result.data.latitude).toBeUndefined();
    }
  });
});

describe("Scenario schema", () => {
  const validScenario = {
    id: "s1",
    name: "Test Scenario",
    type: "conservative",
    description: "A test scenario",
    estimatedUnits: { min: 1, max: 4 },
    estimatedCost: { min: 100000, max: 500000 },
    estimatedValue: { min: 200000, max: 800000 },
    timeline: "12-18 months",
    riskLevel: "medium",
    confidence: "high",
    recommendation: "Recommended",
    massingConfig: {
      mainBuilding: { width: 30, depth: 40, height: 25, color: "#8B7355" },
    },
  };

  it("parses a valid object successfully", () => {
    const result = scenarioSchema.safeParse(validScenario);
    expect(result.success).toBe(true);
  });

  it("throws on missing required fields", () => {
    const result = scenarioSchema.safeParse({ id: "s1" });
    expect(result.success).toBe(false);
  });

  it("throws on wrong field types", () => {
    const result = scenarioSchema.safeParse({ ...validScenario, estimatedUnits: "not an object" });
    expect(result.success).toBe(false);
  });
});

describe("Risk schema", () => {
  const validRisk = {
    id: "r1",
    category: "zoning",
    severity: "high",
    likelihood: "possible",
    summary: "Test risk",
    mitigation: "Mitigate it",
    verifiedBy: "Expert",
  };

  it("parses a valid object successfully", () => {
    const result = riskSchema.safeParse(validRisk);
    expect(result.success).toBe(true);
  });

  it("throws on missing required fields", () => {
    const result = riskSchema.safeParse({ id: "r1" });
    expect(result.success).toBe(false);
  });

  it("throws on wrong field types", () => {
    const result = riskSchema.safeParse({ ...validRisk, severity: 123 });
    expect(result.success).toBe(false);
  });
});

describe("Report schema", () => {
  const validReport = {
    id: "report-1",
    propertyId: "prop-1",
    title: "Test Report",
    generatedAt: new Date().toISOString(),
    sections: [{ id: "s1", title: "Section 1", content: "Content", order: 1 }],
    disclaimer: "Test disclaimer",
  };

  it("parses a valid object successfully", () => {
    const result = reportSchema.safeParse(validReport);
    expect(result.success).toBe(true);
  });

  it("throws on missing required fields", () => {
    const result = reportSchema.safeParse({ id: "report-1" });
    expect(result.success).toBe(false);
  });

  it("throws on wrong field types", () => {
    const result = reportSchema.safeParse({ ...validReport, sections: "not array" });
    expect(result.success).toBe(false);
  });
});

describe("SourceRecord schema", () => {
  const validSource = {
    id: "src-1",
    sourceName: "Test Source",
    sourceType: "assessor",
    title: "Test title",
    retrievedAt: new Date().toISOString(),
    confidence: "high",
  };

  it("parses a valid object successfully", () => {
    const result = sourceRecordSchema.safeParse(validSource);
    expect(result.success).toBe(true);
  });

  it("throws on missing required fields", () => {
    const result = sourceRecordSchema.safeParse({ id: "src-1" });
    expect(result.success).toBe(false);
  });

  it("parses optional fields as undefined when omitted", () => {
    const result = sourceRecordSchema.safeParse(validSource);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.url).toBeUndefined();
      expect(result.data.notes).toBeUndefined();
    }
  });
});

describe("confidence enum", () => {
  it("accepts only low, medium, high", () => {
    expect(confidenceSchema.safeParse("low").success).toBe(true);
    expect(confidenceSchema.safeParse("medium").success).toBe(true);
    expect(confidenceSchema.safeParse("high").success).toBe(true);
  });

  it("rejects anything else", () => {
    expect(confidenceSchema.safeParse("real").success).toBe(false);
    expect(confidenceSchema.safeParse("fallback").success).toBe(false);
    expect(confidenceSchema.safeParse("partial").success).toBe(false);
    expect(confidenceSchema.safeParse("invalid").success).toBe(false);
    expect(confidenceSchema.safeParse(123).success).toBe(false);
  });
});
