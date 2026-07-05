import { SourceRecord } from "../schemas/source";
import { PropertyRecord } from "../schemas/property";

/**
 * Normalized types for public data adapters.
 * Each adapter returns data conforming to these types.
 */

export interface AdapterResult {
  success: boolean;
  property?: Partial<PropertyRecord>;
  sources: SourceRecord[];
  errors?: string[];
}

export interface DataAdapter {
  name: string;
  supportedCities: string[];
  fetch(address: string, city: string): Promise<AdapterResult>;
}
