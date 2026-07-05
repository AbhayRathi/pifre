# Property Command Center

**Development intelligence platform for real estate investors, developers, architects, and construction professionals** — answer the question: _should you buy, build, convert, redesign, negotiate, or walk away?_

## Architecture Overview

```
HTTP Adapter → normalizeAdapterResults → PropertyRecord + SourceRecord[] → Zod validation → React component props
```

Every data point flows through a confidence-tracked pipeline:

1. **Adapters** fetch from public data portals (SF OpenData, San Jose GIS, Alameda County, CA Geoportal)
2. **Normalization** merges results, deduplicates, and assigns data quality (`real` / `partial` / `fallback`)
3. **Zod schemas** validate all data at runtime
4. **UI components** display results with confidence badges so professionals know what to trust

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Environment Variables

See [`.env.example`](./.env.example) for all available configuration. The app runs fully with mock data when no environment variables are set.

## Data Sources

| Adapter                    | Public URL                               | Data Provided                                         |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| SF OpenData (DataSF)       | https://datasf.org/opendata/             | Assessor records, property tax rolls, zoning, permits |
| San Jose GIS Open Data     | https://gisdata-csj.opendata.arcgis.com/ | Zoning districts, parcels, general plan land use      |
| Alameda County Open Data   | https://data.acgov.org/                  | Parcel boundaries, assessor rolls, county GIS layers  |
| California State Geoportal | https://gis.data.ca.gov/                 | Statewide parcels, hazards, environmental overlays    |

## Tech Stack

| Layer      | Technology                                                       |
| ---------- | ---------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                                          |
| Language   | TypeScript (strict mode)                                         |
| Styling    | Tailwind CSS v4 with custom `@theme` (graphite / ivory / copper) |
| Validation | Zod                                                              |
| Components | shadcn-style (CVA + Tailwind)                                    |
| Testing    | Vitest + Testing Library + MSW                                   |
| E2E        | Playwright                                                       |

## Documentation

- [`docs/architecture.md`](./docs/architecture.md) — System architecture and data flow
- [`docs/v1-spec.md`](./docs/v1-spec.md) — Full V1 product specification

## Confidence Badge Legend

| Badge           | Meaning                                                          |
| --------------- | ---------------------------------------------------------------- |
| 🟢 **Real**     | Data fetched successfully from a live public API                 |
| 🟡 **Partial**  | Some data retrieved but incomplete or from secondary sources     |
| 🔴 **Fallback** | Using demo/mock data — requires verification before any decision |

All data confidence levels are tracked end-to-end from adapter to report export. Professional verification is always recommended before acquisition, design, or investment decisions.
