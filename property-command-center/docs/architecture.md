# Architecture

## Overview

Property Command Center is a Next.js application that provides development intelligence for real estate decisions. It combines public data from multiple sources, scenario modeling, risk assessment, and report generation.

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Dashboard │  │Property      │  │Report        │  │
│  │Page      │  │Workspace     │  │Preview       │  │
│  └──────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────┤
│                  API Routes (Next.js)               │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │property-search   │  │public-data             │  │
│  │  - search mock   │  │  - fetch adapters      │  │
│  │  - filter props  │  │  - normalize results   │  │
│  └──────────────────┘  └────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│              Data Adapter Layer                      │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐  │
│  │SF Data │ │SJ GIS  │ │Alameda │ │CA Geoportal│  │
│  │Adapter │ │Adapter │ │Adapter │ │Adapter     │  │
│  └────────┘ └────────┘ └────────┘ └────────────┘  │
├─────────────────────────────────────────────────────┤
│          Normalization & Schema Layer                │
│  ┌────────────────┐  ┌──────────────────────────┐  │
│  │normalize.ts    │  │Zod Schemas               │  │
│  │  - merge data  │  │  - PropertyRecord        │  │
│  │  - quality     │  │  - SourceRecord          │  │
│  │  - confidence  │  │  - Scenario              │  │
│  └────────────────┘  │  - Risk, Report          │  │
│                       └──────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│              Fallback / Mock Data                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  3 Bay Area demo properties                  │  │
│  │  Realistic scenarios, risks, assumptions     │  │
│  │  Clearly marked as fallback/demo             │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Data Flow

1. User enters address on Dashboard
2. Frontend calls `/api/public-data?address=...&city=...`
3. API route selects adapters based on city
4. Each adapter attempts real public data fetch
5. Results normalized into `PropertyRecord`
6. If all adapters fail, fallback to mock data
7. Property workspace renders with available data
8. Data quality badges indicate real/partial/fallback

## RAG Architecture (Future)

The system is architected to support Retrieval-Augmented Generation:

### Document Ingestion Pipeline (Planned)
1. User uploads property packet (PDF, plans, notes, documents)
2. System extracts text using OCR/PDF parsing
3. Text is chunked into semantic segments
4. Key facts are extracted and linked to source records
5. Chunks are embedded using vector embeddings

### Source-Grounded Report Generation (Planned)
1. Report template defines required sections
2. For each section, system retrieves relevant chunks
3. AI generates section content citing specific sources
4. Every claim must reference a source record with confidence
5. Human reviews generated output before delivery
6. Reviewer can approve, edit, or flag sections

### Architecture Stubs in Current Code
- `lib/reports/report-template.ts` — Section structure for RAG generation
- `lib/reports/build-report.ts` — Template-based report (pre-AI)
- `lib/schemas/source.ts` — Source record tracking
- `lib/public-data/types.ts` — Adapter interface for future sources

### Future RAG Components
- Document store (Supabase or similar)
- Embedding pipeline (OpenAI embeddings or open-source)
- Vector similarity search
- Source-citation requirement in AI prompts
- Human-in-the-loop review interface
- Version history for source records

## Key Design Decisions

1. **Real data first:** Adapters attempt live public API calls before falling back
2. **Graceful degradation:** UI never crashes on data failure; shows fallback state
3. **Source transparency:** Every data point tracks its origin and confidence
4. **Schema-driven:** Zod schemas validate all data structures
5. **No auth required:** V1 is open for demo/testing
6. **No paid APIs:** All V1 data sources are free public endpoints
7. **Modular adapters:** New data sources can be added without changing core logic

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Forms | React Hook Form (ready) |
| UI Components | Custom shadcn-style |
| State | React useState (local) |
| Data Fetching | Native fetch + adapters |

## File Structure

```
property-command-center/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Tailwind + custom theme
│   ├── properties/[id]/   # Property workspace
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Base UI primitives
│   ├── dashboard/        # Dashboard-specific
│   └── property/         # Workspace components
├── lib/                   # Business logic
│   ├── schemas/          # Zod validation schemas
│   ├── public-data/      # Data adapter layer
│   │   └── adapters/    # Per-source adapters
│   ├── data/            # Mock/fallback data
│   └── reports/         # Report generation
└── docs/                  # Documentation
```
