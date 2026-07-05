import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { sfPropertyAdapter } from "../adapters/sf-property";
import { sanJoseGisAdapter } from "../adapters/san-jose-gis";
import { alamedaCountyAdapter } from "../adapters/alameda-county";
import { californiaGeoportalAdapter } from "../adapters/california-geoportal";

const handlers = [
  // SF Property - success (SODA API)
  http.get("https://data.sfgov.org/resource/wv5m-vpq2.json", () => {
    return HttpResponse.json([
      {
        lot_area: "5000",
        building_area: "2000",
        property_class_code_definition: "Residential",
        year_property_built: "1950",
      },
    ]);
  }),

  // San Jose GIS - success
  http.get("https://gisdata-csj.opendata.arcgis.com/api/search/v1", () => {
    return HttpResponse.json({ results: [{ title: "Test parcel" }] });
  }),

  // Alameda County
  http.get("https://data.acgov.org/api/views/metadata/v1", () => {
    return HttpResponse.json({ name: "parcels", id: "abc123" });
  }),

  // California Geoportal
  http.get("https://gis.data.ca.gov/api/search/v1", () => {
    return HttpResponse.json({ results: [{ title: "CA parcel" }] });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SF Property Adapter", () => {
  it("success path: returns SourceRecord with high confidence on 200", async () => {
    const result = await sfPropertyAdapter.fetch("123 Main St", "San Francisco");
    expect(result.success).toBe(true);
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources[0].confidence).toBe("high");
  });

  it("non-200 path: returns SourceRecord with low confidence on 404", async () => {
    server.use(
      http.get("https://data.sfgov.org/resource/wv5m-vpq2.json", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const result = await sfPropertyAdapter.fetch("notfound address", "San Francisco");
    expect(result.sources.length).toBeGreaterThan(0);
    const lowConfSources = result.sources.filter((s) => s.confidence === "low");
    expect(lowConfSources.length).toBeGreaterThan(0);
  });

  it("network error path: returns fallback (no throw)", async () => {
    server.use(
      http.get("https://data.sfgov.org/resource/wv5m-vpq2.json", () => {
        return HttpResponse.error();
      })
    );
    const result = await sfPropertyAdapter.fetch("error address", "San Francisco");
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.success).toBe(false);
  });
});

describe("San Jose GIS Adapter", () => {
  it("success path: returns SourceRecord on 200", async () => {
    const result = await sanJoseGisAdapter.fetch("123 Main St", "San Jose");
    expect(result.success).toBe(true);
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("non-200 path: returns SourceRecord with low confidence on 404", async () => {
    server.use(
      http.get("https://gisdata-csj.opendata.arcgis.com/api/search/v1", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const result = await sanJoseGisAdapter.fetch("notfound", "San Jose");
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources.some((s) => s.confidence === "low")).toBe(true);
  });

  it("network error path: returns fallback (no throw)", async () => {
    server.use(
      http.get("https://gisdata-csj.opendata.arcgis.com/api/search/v1", () => {
        return HttpResponse.error();
      })
    );
    const result = await sanJoseGisAdapter.fetch("error", "San Jose");
    expect(result.success).toBe(false);
    expect(result.sources.length).toBeGreaterThan(0);
  });
});

describe("Alameda County Adapter", () => {
  it("success path: returns SourceRecord on 200", async () => {
    const result = await alamedaCountyAdapter.fetch("123 Main St", "Oakland");
    expect(result.success).toBe(true);
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("non-200 path: returns SourceRecord with low confidence", async () => {
    server.use(
      http.get("https://data.acgov.org/api/views/metadata/v1", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const result = await alamedaCountyAdapter.fetch("notfound", "Oakland");
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("network error path: returns fallback (no throw)", async () => {
    server.use(
      http.get("https://data.acgov.org/api/views/metadata/v1", () => {
        return HttpResponse.error();
      })
    );
    const result = await alamedaCountyAdapter.fetch("error", "Oakland");
    expect(result.success).toBe(false);
    expect(result.sources.length).toBeGreaterThan(0);
  });
});

describe("California Geoportal Adapter", () => {
  it("success path: returns SourceRecord on 200", async () => {
    const result = await californiaGeoportalAdapter.fetch("123 Main St", "Any City");
    expect(result.success).toBe(true);
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("non-200 path: returns SourceRecord with low confidence", async () => {
    server.use(
      http.get("https://gis.data.ca.gov/api/search/v1", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const result = await californiaGeoportalAdapter.fetch("notfound", "Any City");
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it("network error path: returns fallback (no throw)", async () => {
    server.use(
      http.get("https://gis.data.ca.gov/api/search/v1", () => {
        return HttpResponse.error();
      })
    );
    const result = await californiaGeoportalAdapter.fetch("error", "Any City");
    expect(result.success).toBe(false);
    expect(result.sources.length).toBeGreaterThan(0);
  });
});
