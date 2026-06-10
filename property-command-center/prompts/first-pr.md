# First PR Prompt

Build the first PR for Property Command Center — a browser-first real estate development intelligence prototype.

## What was built

- Full Next.js application with TypeScript and Tailwind CSS v4
- Premium dark-theme visual design (graphite/ivory/copper palette)
- Dashboard with property search, stats, and property cards
- Property workspace with 7-section sidebar navigation
- 3D isometric parcel/building massing visualization
- Scenario comparison system with 3-4 scenarios per property
- Editable assumptions panel with Zod-validated fields
- Risk register with severity/likelihood/mitigation
- AI agent placeholder with canned intelligent responses
- Full Property Opportunity Brief report preview with export
- Source tracking with confidence badges
- Public data adapter architecture (SF, San Jose, Alameda, CA)
- Real API fetch attempts with graceful fallback
- 3 realistic Bay Area demo properties
- Documentation (architecture, data sources, spec)

## How to run

```bash
cd property-command-center
npm install
npm run dev
```

Open http://localhost:3000

## Data strategy

- Real: SF OpenData SODA API queries (assessor records)
- Real: San Jose GIS portal queries
- Real: Alameda County open data queries
- Real: California State Geoportal queries
- Fallback: 3 demo properties with realistic Bay Area data
- All data clearly labeled with confidence and source badges
