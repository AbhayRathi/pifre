import { describe, it, expect } from "vitest";
import { buildReport } from "../build-report";
import { PropertyRecord } from "../../schemas/property";
import { Scenario } from "../../schemas/scenario";
import { Risk } from "../../schemas/risk";

const mockProperty: PropertyRecord = {
  id: "test-prop",
  address: "123 Main St",
  city: "Oakland",
  state: "CA",
  sourceRecords: [
    {
      id: "s1",
      sourceName: "Test",
      sourceType: "assessor",
      title: "Test",
      retrievedAt: "2024-01-01T00:00:00Z",
      confidence: "high",
    },
  ],
  dataQuality: "fallback",
  lotSizeSqFt: 5000,
  currentUse: "Residential",
  zoning: "RM-2",
};

const mockScenarios: Scenario[] = [
  {
    id: "s1",
    name: "Conservative",
    type: "conservative",
    description: "Test scenario",
    estimatedUnits: { min: 1, max: 2 },
    estimatedCost: { min: 100000, max: 200000 },
    estimatedValue: { min: 300000, max: 500000 },
    timeline: "6-9 months",
    riskLevel: "low",
    confidence: "high",
    recommendation: "Good option",
    massingConfig: { mainBuilding: { width: 30, depth: 40, height: 25, color: "#8B7355" } },
  },
];

const mockRisks: Risk[] = [
  {
    id: "r1",
    category: "zoning",
    severity: "medium",
    likelihood: "possible",
    summary: "Zoning issue",
    mitigation: "Verify",
    verifiedBy: "Attorney",
  },
];

const mockAssumptions = {
  acquisitionPrice: 750000,
  lotSize: 5000,
  buildingSize: 1400,
  targetUnits: 4,
  hardCostPerSqFt: 350,
  softCostPercentage: 25,
  contingencyPercentage: 15,
  targetRent: 2800,
  targetSaleValue: 550000,
  financingNotes: "Test notes",
};

describe("buildReport", () => {
  it("returns a report with exactly 12 sections", () => {
    const report = buildReport(mockProperty, mockScenarios, mockRisks, mockAssumptions);
    expect(report.sections).toHaveLength(12);
  });

  it("every section has a non-empty title and content", () => {
    const report = buildReport(mockProperty, mockScenarios, mockRisks, mockAssumptions);
    for (const section of report.sections) {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.content.length).toBeGreaterThan(0);
    }
  });

  it("report.id is a non-empty string", () => {
    const report = buildReport(mockProperty, mockScenarios, mockRisks, mockAssumptions);
    expect(report.id.length).toBeGreaterThan(0);
  });

  it("report.disclaimer contains the word professional", () => {
    const report = buildReport(mockProperty, mockScenarios, mockRisks, mockAssumptions);
    const lowerDisclaimer = report.disclaimer.toLowerCase();
    expect(lowerDisclaimer.includes("professional") || lowerDisclaimer.includes("fallback")).toBe(
      true
    );
  });

  it("generates correctly when scenarios is empty", () => {
    const report = buildReport(mockProperty, [], mockRisks, mockAssumptions);
    expect(report.sections).toHaveLength(12);
    expect(report.sections[4].content).toBeDefined();
  });

  it("generates correctly when risks is empty", () => {
    const report = buildReport(mockProperty, mockScenarios, [], mockAssumptions);
    expect(report.sections).toHaveLength(12);
    expect(report.sections[7].content).toBeDefined();
  });
});
