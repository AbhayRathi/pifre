import { DataAdapter, AdapterResult } from "../types";
import { SourceRecord } from "../../schemas/source";
import { makeSourceId } from "../adapter-utils";

/**
 * California State Geoportal Adapter
 *
 * Fallback adapter that queries California-wide GIS data.
 *
 * Real endpoints:
 * - CA State Geoportal: https://gis.data.ca.gov/
 * - CA Parcels: https://gis.data.ca.gov/datasets/CALFIRE-Forestry::california-parcels
 * - CA Protected Areas: https://gis.data.ca.gov/datasets/CPAD-Holdings
 *
 * TODO: Implement statewide parcel geometry lookup
 * TODO: Add CEQA/environmental overlay data
 * TODO: Integrate hazard zones (fire, flood, earthquake)
 * TODO: Add census tract and demographic context
 */
export const californiaGeoportalAdapter: DataAdapter = {
  name: "California State Geoportal",
  supportedCities: [], // Supports all CA cities as fallback

  async fetch(address: string, city: string): Promise<AdapterResult> {
    const sources: SourceRecord[] = [];

    try {
      // California State Geoportal - general search
      const encodedQuery = encodeURIComponent(`${address} ${city} California`);
      const searchUrl = `https://gis.data.ca.gov/api/search/v1?q=${encodedQuery}`;

      const response = await fetch(searchUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        sources.push({
          id: makeSourceId("ca-geoportal", address),
          sourceName: "California State Geoportal",
          sourceType: "gis",
          title: `State-level GIS search for ${address}, ${city}`,
          url: "https://gis.data.ca.gov/",
          retrievedAt: new Date().toISOString(),
          confidence: "low",
          notes:
            "State-level search completed. More specific local data sources should be preferred.",
        });

        return {
          success: true,
          property: {
            state: "CA",
          },
          sources,
        };
      }

      sources.push({
        id: makeSourceId("ca-geoportal-no-match", address),
        sourceName: "California State Geoportal",
        sourceType: "gis",
        title: `No state-level data found for ${address}`,
        url: "https://gis.data.ca.gov/",
        retrievedAt: new Date().toISOString(),
        confidence: "low",
        notes: "State geoportal query returned no results.",
      });

      return { success: false, sources };
    } catch (error) {
      sources.push({
        id: makeSourceId("ca-geoportal-error", address),
        sourceName: "California State Geoportal",
        sourceType: "gis",
        title: `Failed to query state data for ${address}`,
        url: "https://gis.data.ca.gov/",
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
