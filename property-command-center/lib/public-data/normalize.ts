import { PropertyRecord } from "../schemas/property";
import { SourceRecord } from "../schemas/source";
import { AdapterResult } from "./types";

/**
 * Normalize partial adapter results into a single PropertyRecord.
 * Merges data from multiple adapters, preferring real data over fallback.
 */
export function normalizeAdapterResults(
  baseAddress: string,
  city: string,
  state: string,
  results: AdapterResult[]
): PropertyRecord {
  const allSources: SourceRecord[] = [];
  let merged: Partial<PropertyRecord> = {
    address: baseAddress,
    city,
    state,
  };

  let hasRealData = false;
  let hasPartialData = false;

  for (const result of results) {
    if (result.success && result.property) {
      hasRealData = true;
      merged = { ...merged, ...stripUndefined(result.property) };
    } else if (result.sources.length > 0) {
      hasPartialData = true;
    }
    allSources.push(...result.sources);
  }

  const dataQuality = hasRealData ? "real" : hasPartialData ? "partial" : "fallback";

  return {
    id: generatePropertyId(baseAddress, city),
    address: merged.address || baseAddress,
    city: merged.city || city,
    county: merged.county,
    state: merged.state || state,
    latitude: merged.latitude,
    longitude: merged.longitude,
    parcelNumber: merged.parcelNumber,
    lotSizeSqFt: merged.lotSizeSqFt,
    buildingSizeSqFt: merged.buildingSizeSqFt,
    currentUse: merged.currentUse,
    zoning: merged.zoning,
    yearBuilt: merged.yearBuilt,
    sourceRecords: allSources,
    dataQuality,
  };
}

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

function generatePropertyId(address: string, city: string): string {
  const base = `${address}-${city}`.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return base.substring(0, 40);
}
