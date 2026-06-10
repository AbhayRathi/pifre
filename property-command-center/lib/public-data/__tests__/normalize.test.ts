import { describe, it, expect } from "vitest";
import { normalizeAdapterResults } from "../normalize";
import { AdapterResult } from "../types";

describe("normalizeAdapterResults", () => {
  it("returns a property record with empty sources when given empty results array", async () => {
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", []);
    expect(result.sourceRecords).toEqual([]);
    expect(result.address).toBe("123 Main St");
    expect(result.city).toBe("Oakland");
    expect(result.state).toBe("CA");
    expect(result.dataQuality).toBe("fallback");
  });

  it("merges results from multiple adapters deduplicating by sourceId", async () => {
    const results: AdapterResult[] = [
      {
        success: true,
        property: { lotSizeSqFt: 5000, zoning: "RM-2" },
        sources: [
          { id: "src-1", sourceName: "Adapter A", sourceType: "assessor", title: "Test", retrievedAt: "2024-01-01T00:00:00Z", confidence: "high" },
        ],
      },
      {
        success: true,
        property: { yearBuilt: 1950 },
        sources: [
          { id: "src-2", sourceName: "Adapter B", sourceType: "gis", title: "Test 2", retrievedAt: "2024-01-01T00:00:00Z", confidence: "medium" },
        ],
      },
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.sourceRecords).toHaveLength(2);
    expect(result.lotSizeSqFt).toBe(5000);
    expect(result.yearBuilt).toBe(1950);
    expect(result.zoning).toBe("RM-2");
  });

  it("sets dataQuality to real when at least one adapter succeeded", async () => {
    const results: AdapterResult[] = [
      { success: true, property: { city: "Oakland" }, sources: [{ id: "s1", sourceName: "A", sourceType: "gis", title: "T", retrievedAt: "2024-01-01T00:00:00Z", confidence: "high" }] },
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.dataQuality).toBe("real");
  });

  it("sets dataQuality to partial when no adapter succeeded but sources exist", async () => {
    const results: AdapterResult[] = [
      { success: false, sources: [{ id: "s1", sourceName: "A", sourceType: "gis", title: "T", retrievedAt: "2024-01-01T00:00:00Z", confidence: "low" }] },
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.dataQuality).toBe("partial");
  });

  it("sets dataQuality to fallback when adapter threw with no sources", async () => {
    const results: AdapterResult[] = [
      { success: false, sources: [], errors: ["Network error"] },
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.dataQuality).toBe("fallback");
  });

  it("correctly sets fetchedAt in source records", async () => {
    const now = new Date().toISOString();
    const results: AdapterResult[] = [
      { success: true, property: {}, sources: [{ id: "s1", sourceName: "A", sourceType: "gis", title: "T", retrievedAt: now, confidence: "high" }] },
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.sourceRecords[0].retrievedAt).toBe(now);
  });

  it("returns all sources from all adapters", async () => {
    const results: AdapterResult[] = [
      { success: true, property: {}, sources: [
        { id: "s1", sourceName: "A", sourceType: "gis", title: "T1", retrievedAt: "2024-01-01T00:00:00Z", confidence: "high" },
        { id: "s2", sourceName: "B", sourceType: "assessor", title: "T2", retrievedAt: "2024-01-01T00:00:00Z", confidence: "medium" },
      ]},
      { success: false, sources: [
        { id: "s3", sourceName: "C", sourceType: "fallback", title: "T3", retrievedAt: "2024-01-01T00:00:00Z", confidence: "low" },
      ]},
    ];
    const result = await normalizeAdapterResults("123 Main St", "Oakland", "CA", results);
    expect(result.sourceRecords).toHaveLength(3);
  });
});
