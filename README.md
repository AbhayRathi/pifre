# Property Command Center

> Development intelligence for property decisions.

## Overview

Property Command Center is a visual command center for real estate development decisions. It helps developers, builders, investors, architects, and property buyers answer:

**"Should I buy, build, convert, redesign, negotiate, or walk away from this property?"**

This is not a generic chatbot. Not a boring SaaS table app. It's a spatial, visual, premium intelligence system — like Jarvis for property development.

## Product Vision

Build a decision-support platform that:
- Pulls real public data from official sources
- Normalizes property/parcel/zoning information
- Generates development scenarios with cost/revenue ranges
- Identifies and categorizes risks
- Produces a Full Property Opportunity Brief
- Tracks data confidence and source provenance
- Supports human verification workflows

## V1 Scope (This PR)

- [x] Premium dashboard with search and property cards
- [x] Property workspace with sidebar navigation
- [x] 3D isometric parcel/building visualization
- [x] 3-4 development scenarios per property
- [x] Scenario comparison table
- [x] Editable assumptions panel
- [x] Risk register with severity/likelihood
- [x] Full report preview with export
- [x] AI agent placeholder (structured for real AI later)
- [x] Public data adapter architecture
- [x] Real API fetch attempts (SF OpenData, San Jose GIS, Alameda, CA Geoportal)
- [x] Graceful fallback to demo data
- [x] Source confidence badges
- [x] 3 Bay Area demo properties
- [x] No auth required
- [x] No paid APIs required
- [x] Runs locally with `npm install && npm run dev`

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | Framework (App Router) |
| TypeScript | Type safety (strict) |
| Tailwind CSS v4 | Styling with custom theme |
| Zod | Schema validation |
| React Hook Form | Form handling (ready) |
| Lucide React | Icons |
| Custom UI | shadcn/ui-style components |

## Local Setup

```bash
cd property-command-center
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**No API keys required. No environment variables needed.**

## Data Source Strategy

### Real Public Data Adapters

1. **San Francisco OpenData (DataSF)** — Assessor records, property tax rolls
2. **San Jose GIS Open Data** — Zoning districts, parcels
3. **Alameda County Open Data** — Parcel data, assessor records
4. **California State Geoportal** — Statewide GIS fallback

Each adapter:
- Attempts real HTTP fetch to public endpoints
- Returns normalized `PropertyRecord` + `SourceRecord[]`
- Handles failures gracefully (never crashes UI)
- Includes confidence level and retrieval metadata

### What is Real vs Fallback

| Data | Status |
|------|--------|
| SF Assessor API queries | Real (public SODA endpoint) |
| San Jose GIS portal queries | Real (public ArcGIS endpoint) |
| Alameda County data queries | Real (public endpoint) |
| CA State Geoportal queries | Real (public endpoint) |
| 3 demo properties | Fallback (clearly labeled) |
| Scenario numbers | Estimates/assumptions (labeled) |
| AI agent responses | Canned placeholder |

## Architecture Overview

```
User → Dashboard → Search → API Route → Data Adapters → Normalize → Property Workspace
                                              ↓
                                    Real Public APIs
                                    (SF, SJ, Alameda, CA)
                                              ↓
                                    Fallback Mock Data
                                    (if all fail)
```

See [docs/architecture.md](property-command-center/docs/architecture.md) for detailed architecture.

## Next Steps (Future PRs)

1. **Real geocoding** — Convert addresses to coordinates for spatial queries
2. **Map integration** — Mapbox/MapLibre parcel visualization
3. **AI integration** — OpenAI/Anthropic for report generation
4. **Document upload** — PDF/image ingestion for property packets
5. **RAG pipeline** — Source-grounded AI report generation
6. **User accounts** — Auth and saved workspaces
7. **More adapters** — Additional jurisdictions and data sources
8. **Export** — PDF generation with professional formatting
9. **Collaboration** — Shared workspaces and comments
10. **Mobile** — Responsive design improvements

## Legal / Trust Disclaimer

**This software is for decision-support purposes only.**

It is NOT legal, architectural, engineering, appraisal, tax, or investment advice. All zoning interpretations, building code assumptions, cost estimates, revenue projections, and market analyses require independent verification by qualified licensed professionals before any acquisition, design, construction, or investment decision.

Past performance and current conditions do not guarantee future results. The user assumes all risk for decisions made based on this information.

## License

See [LICENSE](LICENSE) file.
