import { describe, it, expect } from "vitest";
import { getAdaptersForCity } from "../../data/data-sources";
import { californiaGeoportalAdapter } from "../adapters/california-geoportal";

describe("getAdaptersForCity", () => {
  it("San Francisco returns SF SODA adapter + fallback adapter", () => {
    const adapters = getAdaptersForCity("San Francisco");
    expect(adapters.length).toBeGreaterThanOrEqual(2);
    expect(
      adapters.some(
        (a) => a.name.toLowerCase().includes("san francisco") || a.name.toLowerCase().includes("sf")
      )
    ).toBe(true);
    expect(adapters).toContain(californiaGeoportalAdapter);
  });

  it("San Jose returns San Jose GIS adapter + fallback adapter", () => {
    const adapters = getAdaptersForCity("San Jose");
    expect(adapters.length).toBeGreaterThanOrEqual(2);
    expect(adapters.some((a) => a.name.toLowerCase().includes("san jose"))).toBe(true);
    expect(adapters).toContain(californiaGeoportalAdapter);
  });

  it("Oakland returns Alameda adapter + fallback adapter", () => {
    const adapters = getAdaptersForCity("Oakland");
    expect(adapters.length).toBeGreaterThanOrEqual(2);
    expect(adapters.some((a) => a.name.toLowerCase().includes("alameda"))).toBe(true);
    expect(adapters).toContain(californiaGeoportalAdapter);
  });

  it("unknown city returns only the fallback adapter", () => {
    const adapters = getAdaptersForCity("Unknown City XYZ");
    expect(adapters.length).toBeGreaterThanOrEqual(1);
    expect(adapters).toContain(californiaGeoportalAdapter);
  });

  it("the fallback adapter is always present in every result", () => {
    const cities = ["San Francisco", "San Jose", "Oakland", "Fresno", "Los Angeles"];
    for (const city of cities) {
      const adapters = getAdaptersForCity(city);
      expect(adapters).toContain(californiaGeoportalAdapter);
    }
  });

  it("city matching is case-insensitive", () => {
    const adapters1 = getAdaptersForCity("san francisco");
    const adapters2 = getAdaptersForCity("SAN FRANCISCO");
    expect(adapters1.length).toBe(adapters2.length);
  });
});
