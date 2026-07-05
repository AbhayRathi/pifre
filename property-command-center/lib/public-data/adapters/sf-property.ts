import { DataAdapter, AdapterResult } from "../types";
import { SourceRecord } from "../../schemas/source";
import { makeSourceId } from "../adapter-utils";

/**
 * San Francisco Property Data Adapter
 *
 * Attempts to fetch real data from SF OpenData (DataSF) APIs.
 * Uses the Socrata Open Data API (SODA) endpoints.
 *
 * Real endpoints:
 * - Assessor Historical Secured Property Tax Rolls: https://data.sfgov.org/resource/wv5m-vpq2.json
 * - Planning Department Permits: https://data.sfgov.org/resource/i98e-djp9.json
 * - Zoning Districts: https://data.sfgov.org/resource/xvjh-ra6g.json
 *
 * TODO: Refine endpoint selection based on specific address parsing
 * TODO: Add parcel geometry lookup
 * TODO: Add permit history integration
 */
export const sfPropertyAdapter: DataAdapter = {
  name: "San Francisco OpenData (DataSF)",
  supportedCities: ["San Francisco", "SF"],

  async fetch(address: string, _city: string): Promise<AdapterResult> {
    const sources: SourceRecord[] = [];

    try {
      // Attempt to query SF Assessor data via SODA API
      // This is a real public endpoint - no API key required for basic queries
      const encodedAddress = encodeURIComponent(address.toUpperCase());
      const assessorUrl = `https://data.sfgov.org/resource/wv5m-vpq2.json?$where=property_location%20like%20%27%25${encodedAddress}%25%27&$limit=1`;

      const response = await fetch(assessorUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();

        sources.push({
          id: makeSourceId("sf-assessor", address),
          sourceName: "SF Assessor - Secured Property Tax Rolls",
          sourceType: "assessor",
          title: `Property assessment data for ${address}`,
          url: "https://data.sfgov.org/Housing-and-Buildings/Assessor-Historical-Secured-Property-Tax-Rolls/wv5m-vpq2",
          retrievedAt: new Date().toISOString(),
          confidence: data.length > 0 ? "high" : "low",
          notes:
            data.length > 0 ? "Real data retrieved from SF OpenData" : "No matching records found",
        });

        if (data.length > 0) {
          const record = data[0];
          return {
            success: true,
            property: {
              address: record.property_location || address,
              city: "San Francisco",
              county: "San Francisco",
              state: "CA",
              lotSizeSqFt: record.lot_area ? Number(record.lot_area) : undefined,
              buildingSizeSqFt: record.building_area ? Number(record.building_area) : undefined,
              currentUse: record.property_class_code_definition || undefined,
              yearBuilt: record.year_property_built
                ? Number(record.year_property_built)
                : undefined,
            },
            sources,
          };
        }
      }

      // If we get here, the request succeeded but no data was found
      sources.push({
        id: makeSourceId("sf-assessor-no-match", address),
        sourceName: "SF Assessor - Secured Property Tax Rolls",
        sourceType: "assessor",
        title: `No records found for ${address}`,
        url: "https://data.sfgov.org/Housing-and-Buildings/Assessor-Historical-Secured-Property-Tax-Rolls/wv5m-vpq2",
        retrievedAt: new Date().toISOString(),
        confidence: "low",
        notes:
          "Query returned no results. Address may need reformatting or may not exist in dataset.",
      });

      return { success: false, sources };
    } catch (error) {
      // Network error or timeout - graceful fallback
      sources.push({
        id: makeSourceId("sf-assessor-error", address),
        sourceName: "SF Assessor - Secured Property Tax Rolls",
        sourceType: "assessor",
        title: `Failed to retrieve data for ${address}`,
        url: "https://data.sfgov.org/Housing-and-Buildings/Assessor-Historical-Secured-Property-Tax-Rolls/wv5m-vpq2",
        retrievedAt: new Date().toISOString(),
        confidence: "low",
        notes: `Fetch failed: ${error instanceof Error ? error.message : "Unknown error"}. Using fallback data.`,
      });

      return {
        success: false,
        sources,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      };
    }
  },
};
