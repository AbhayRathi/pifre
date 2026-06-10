import { sfPropertyAdapter } from "../public-data/adapters/sf-property";
import { sanJoseGisAdapter } from "../public-data/adapters/san-jose-gis";
import { alamedaCountyAdapter } from "../public-data/adapters/alameda-county";
import { californiaGeoportalAdapter } from "../public-data/adapters/california-geoportal";
import { DataAdapter } from "../public-data/types";

export interface DataSourceInfo {
  name: string;
  description: string;
  type: string;
  url: string;
  coverage: string;
  status: "active" | "partial" | "planned";
  adapter?: DataAdapter;
}

export const dataSources: DataSourceInfo[] = [
  {
    name: "San Francisco OpenData (DataSF)",
    description: "Assessor records, property tax rolls, zoning districts, and permit data for SF properties.",
    type: "assessor / zoning / permit",
    url: "https://datasf.org/opendata/",
    coverage: "San Francisco",
    status: "active",
    adapter: sfPropertyAdapter,
  },
  {
    name: "San Jose GIS Open Data",
    description: "Zoning districts, parcels, general plan land use, and infrastructure data.",
    type: "gis / zoning",
    url: "https://gisdata-csj.opendata.arcgis.com/",
    coverage: "San Jose",
    status: "partial",
    adapter: sanJoseGisAdapter,
  },
  {
    name: "Alameda County Open Data",
    description: "Parcel boundaries, assessor rolls, and county GIS layers.",
    type: "parcel / assessor",
    url: "https://data.acgov.org/",
    coverage: "Alameda County (Oakland, Berkeley, Fremont, etc.)",
    status: "partial",
    adapter: alamedaCountyAdapter,
  },
  {
    name: "California State Geoportal",
    description: "Statewide GIS data including parcels, hazards, protected areas, and environmental overlays.",
    type: "gis / environmental",
    url: "https://gis.data.ca.gov/",
    coverage: "All California",
    status: "partial",
    adapter: californiaGeoportalAdapter,
  },
  {
    name: "US Census / ACS",
    description: "Demographic and economic context for neighborhoods and census tracts.",
    type: "demographic",
    url: "https://data.census.gov/",
    coverage: "Nationwide",
    status: "planned",
  },
  {
    name: "Market Comps (future)",
    description: "Comparable sales, rental rates, and market trends from MLS/public sources.",
    type: "market",
    url: "",
    coverage: "Bay Area",
    status: "planned",
  },
];

export function getAdaptersForCity(city: string): DataAdapter[] {
  const adapters: DataAdapter[] = [];

  for (const source of dataSources) {
    if (source.adapter && source.status !== "planned") {
      if (
        source.adapter.supportedCities.length === 0 ||
        source.adapter.supportedCities.some(
          (c) => c.toLowerCase() === city.toLowerCase()
        )
      ) {
        adapters.push(source.adapter);
      }
    }
  }

  // Always include California Geoportal as fallback
  if (!adapters.includes(californiaGeoportalAdapter)) {
    adapters.push(californiaGeoportalAdapter);
  }

  return adapters;
}
