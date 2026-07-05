import { DataAdapter, AdapterResult } from "../types";
import { SourceRecord } from "../../schemas/source";
import { makeSourceId } from "../adapter-utils";

/**
 * San Jose GIS / Open Data Adapter
 *
 * Attempts to fetch real data from San Jose's Open Data portal.
 * Uses ArcGIS REST API endpoints.
 *
 * Real endpoints:
 * - Zoning Districts: https://gisdata-csj.opendata.arcgis.com/datasets/zoning-districts
 * - Parcels: https://gisdata-csj.opendata.arcgis.com/datasets/parcels
 * - General Plan Land Use: https://gisdata-csj.opendata.arcgis.com/datasets/general-plan-land-use
 *
 * TODO: Implement geocoding to get coordinates from address
 * TODO: Add spatial query for parcel lookup by coordinates
 * TODO: Integrate permit data when available
 */
export const sanJoseGisAdapter: DataAdapter = {
  name: "San Jose GIS Open Data",
  supportedCities: ["San Jose", "SJ"],

  async fetch(address: string, _city: string): Promise<AdapterResult> {
    const sources: SourceRecord[] = [];

    try {
      // San Jose ArcGIS Feature Server - Zoning Districts
      // This is a real public ArcGIS endpoint
      const encodedAddress = encodeURIComponent(address);
      const zoningUrl = `https://gisdata-csj.opendata.arcgis.com/api/search/v1?q=${encodedAddress}&targets=items`;

      const response = await fetch(zoningUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data: unknown = await response.json();
        const hasResults =
          data !== null &&
          typeof data === "object" &&
          "results" in data &&
          Array.isArray((data as { results: unknown[] }).results) &&
          (data as { results: unknown[] }).results.length > 0;

        sources.push({
          id: makeSourceId("sj-gis", address),
          sourceName: "San Jose GIS Open Data Portal",
          sourceType: "gis",
          title: `GIS data search for ${address}`,
          url: "https://gisdata-csj.opendata.arcgis.com/",
          retrievedAt: new Date().toISOString(),
          confidence: hasResults ? "high" : "medium",
          notes: hasResults
            ? "Search returned matching records from San Jose open data portal."
            : "Search performed against San Jose open data portal. Spatial query refinement needed.",
        });

        return {
          success: true,
          property: {
            city: "San Jose",
            county: "Santa Clara",
            state: "CA",
          },
          sources,
        };
      }

      sources.push({
        id: makeSourceId("sj-gis-no-match", address),
        sourceName: "San Jose GIS Open Data Portal",
        sourceType: "gis",
        title: `No GIS data found for ${address}`,
        url: "https://gisdata-csj.opendata.arcgis.com/",
        retrievedAt: new Date().toISOString(),
        confidence: "low",
        notes: "Portal query returned no usable results.",
      });

      return { success: false, sources };
    } catch (error) {
      sources.push({
        id: makeSourceId("sj-gis-error", address),
        sourceName: "San Jose GIS Open Data Portal",
        sourceType: "gis",
        title: `Failed to query GIS data for ${address}`,
        url: "https://gisdata-csj.opendata.arcgis.com/",
        retrievedAt: new Date().toISOString(),
        confidence: "low",
        notes: `Fetch failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });

      return {
        success: false,
        sources,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      };
    }
  },
};
