import { describe, it, expect } from "vitest";
import { generatePropertyId, formatCurrency, formatNumber } from "../utils";

describe("generatePropertyId", () => {
  it("same address + city always produces same ID", async () => {
    const id1 = await generatePropertyId("123 Main St", "Oakland");
    const id2 = await generatePropertyId("123 Main St", "Oakland");
    expect(id1).toBe(id2);
  });

  it("different city produces different ID", async () => {
    const id1 = await generatePropertyId("123 Main St", "Oakland");
    const id2 = await generatePropertyId("123 Main St", "San Jose");
    expect(id1).not.toBe(id2);
  });

  it("different capitalization of the same address produces same ID", async () => {
    const id1 = await generatePropertyId("123 Main St", "Oakland");
    const id2 = await generatePropertyId("123 MAIN ST", "OAKLAND");
    expect(id1).toBe(id2);
  });

  it("ID length is exactly 16 characters", async () => {
    const id = await generatePropertyId("123 Main St", "Oakland");
    expect(id).toHaveLength(16);
  });

  it("ID contains only hex characters", async () => {
    const id = await generatePropertyId("123 Main St", "Oakland");
    expect(id).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe("formatCurrency", () => {
  it("formats positive numbers with $ and commas", () => {
    expect(formatCurrency(1500000)).toBe("$1,500,000");
  });

  it("formats negative numbers correctly", () => {
    expect(formatCurrency(-5000)).toBe("-$5,000");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("handles values over $1M", () => {
    expect(formatCurrency(12345678)).toBe("$12,345,678");
  });
});

describe("formatNumber", () => {
  it("adds commas at thousands separator", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("handles decimals correctly", () => {
    expect(formatNumber(1234.56)).toBe("1,234.56");
  });
});
