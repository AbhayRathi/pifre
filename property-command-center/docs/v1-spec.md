# Property Intelligence V1: Partner Questions + Build Spec

## Purpose

Build a software-enabled consulting product that generates a Full Property Opportunity Brief for developers, builders, investors, architects, and property buyers evaluating real estate opportunities in the Bay Area / Central California.

The first product is not a generic AI chatbot. It is a decision-support system for answering:

Should we buy, build, convert, redesign, negotiate, or walk away from this property?

---

# 1. Questions for Partner

## A. Core Direction

1. Do you agree that V1 should be a software-enabled consulting product before pure SaaS?
2. Do you agree that the first paid deliverable should be a Full Property Opportunity Brief?
3. Do you see this first as:
   - developer tool,
   - architect tool,
   - investor tool,
   - construction/preconstruction tool,
   - or a broader real estate intelligence platform?
4. What is the most painful problem this should solve first?
5. What would make this valuable enough for someone to pay for immediately?
6. What should we avoid building in V1?

## B. First Customer

1. Who do you think is the easiest first paying customer?
   - small developer,
   - construction firm,
   - architect,
   - real estate investor,
   - private property buyer,
   - ADU builder,
   - short-term rental developer,
   - affordable housing operator,
   - other?
2. Who has the biggest pain and the shortest sales cycle?
3. Who already pays for feasibility, zoning, design, pro formas, or development advice?
4. Who can give us the best feedback fastest?
5. Who do we already know that fits this profile?
6. What events, meetups, associations, or local networks should we attend?
7. Who would be willing to review a sample brief?

## C. Geography

1. Should V1 focus on:
   - San Francisco,
   - Oakland / Alameda County,
   - Berkeley,
   - San Jose / Santa Clara County,
   - Sacramento,
   - Central Valley,
   - or another Bay Area-adjacent market?
2. Which geography has the best mix of:
   - pain,
   - opportunity,
   - public data,
   - active developers,
   - feasible construction economics,
   - and local access?
3. Should we avoid San Francisco first because of complexity?
4. Should we use San Francisco only as a lighthouse/adaptive reuse case?
5. What local rules, zoning patterns, or housing opportunities do we already understand better than outsiders?

## D. First Property Types

1. Which property type should V1 handle first?
   - single-family with ADU potential,
   - vacant residential lot,
   - small multifamily,
   - mixed-use building,
   - underused commercial building,
   - hotel/motel conversion,
   - short-term rental property,
   - office-to-residential conversion,
   - land for new development?
2. Which property type has the clearest willingness to pay?
3. Which property type can we analyze accurately with available data?
4. Which property type creates the best demo?
5. Which property type aligns best with affordable/sustainable housing?

## E. Paid Deliverable

1. What should the Full Property Opportunity Brief include at minimum?
2. What sections would a developer actually care about?
3. What sections would an architect care about?
4. What sections would a construction firm care about?
5. What sections would an investor/lender care about?
6. What sections would be impressive but unnecessary for V1?
7. How long should the brief be?
8. Should the output be:
   - PDF,
   - web page,
   - slide deck,
   - editable report,
   - spreadsheet,
   - or all of the above eventually?
9. What would make the brief feel premium?
10. What should the final recommendation look like?

## F. Pricing and Business Model

1. What would someone pay for one report?
2. Should we test:
   - $500,
   - $1,000,
   - $2,500,
   - $5,000,
   - or more?
3. What would justify a $5k+ report?
4. What would make a customer pay monthly?
5. Should recurring pricing be based on:
   - number of properties,
   - number of reports,
   - seats,
   - human review,
   - data access,
   - or deal-desk support?
6. Should we offer a discounted pilot to first customers?
7. Should we charge for manual consulting before software is complete?
8. What proof do we need before building a full SaaS dashboard?

## G. Technical Direction

1. What is the fastest stack to prototype this?
2. Are we aligned on Next.js + TypeScript + Supabase + AI SDK as V1?
3. Do we need Python workers in V1, or can we delay them?
4. What should be manual at first?
5. What should be automated first?
6. How do we structure report data so it can later become SaaS?
7. How do we store property assumptions, sources, documents, and scenarios?
8. Do we need maps in V1?
9. Do we need PDF export in V1?
10. What is the smallest useful product we can demo in 1-2 weeks?

## H. AI / Agent System

1. Should V1 use simple deterministic pipelines instead of complex agents?
2. Which agent modules are actually needed first?
   - property intake,
   - document extraction,
   - zoning summary,
   - market summary,
   - scenario generation,
   - cost model,
   - pro forma,
   - risk register,
   - report composer?
3. What outputs must be structured JSON?
4. How do we prevent hallucinated zoning, cost, or legal claims?
5. What confidence levels should the system show?
6. What should always require human review?
7. How do we separate verified facts from assumptions?
8. How do we make the system improve after every brief?

## I. Data Sources

1. What data sources do we need for the first brief?
2. Which are public and easy to access?
3. Which require manual lookup?
4. Which require paid APIs later?
5. What city/county data sources are strongest in our target geography?
6. Do we need parcel data for V1?
7. Do we need zoning maps for V1?
8. Do we need rent/sale comps for V1?
9. Do we need construction cost databases for V1?
10. How much can we handle manually before automating?

## J. Trust / Legal / Risk

1. What disclaimers must be included?
2. What should we never claim?
3. Should we say this is decision support only?
4. Who reviews reports before delivery?
5. How do we avoid giving legal, architectural, engineering, appraisal, or investment advice?
6. How do we protect client-uploaded documents?
7. How do we handle low-confidence findings?
8. Should we include a verification checklist in every report?
9. What professional partners should we eventually involve?
10. What would make a client trust the output?

## K. Mission / Long-Term Vision

1. How do we help workers and communities, not just capital?
2. How do we include affordability analysis without making the first product too idealistic?
3. Should every brief include a community/affordability/sustainability section?
4. How do we avoid helping only extractive development?
5. What kinds of projects would we refuse to support?
6. How do we make smaller developers/builders more competitive?
7. How do we eventually reduce housing cost?
8. How does this connect to the broader operating intelligence / EQUIDAR vision?
9. How do we keep the long-term platform vision without overbuilding V1?
10. What would make this company matter beyond revenue?

---

# 2. V1 Spec

## Product Name

Working names:

- Property Intelligence Brief
- Development Intelligence Brief
- Property Opportunity Brief
- BuiltWorld Intelligence
- Real Estate Development Intelligence
- Habitat Intelligence

Recommended V1 name:

Property Opportunity Brief

Recommended company/category framing:

Pre-development intelligence for builders, developers, investors, and architects.

## One-Liner

A software-enabled real estate intelligence product that turns a property, parcel, listing, or building into a decision-ready opportunity brief.

## Core User Question

Should I buy, build, convert, redesign, negotiate, or walk away from this property?

## V1 Goal

Sell and deliver 3-5 high-quality Full Property Opportunity Briefs before building a full SaaS product.

## V1 Strategy

Start manual-first.

Use AI internally to speed up research, document extraction, scenario generation, assumptions, and report drafting.

Use human review before anything goes to the client.

Every repeated manual workflow becomes a future product module.

## Target Customer

Primary:

Small-to-mid-size real estate developers, builders, and investors evaluating property opportunities in the Bay Area / Central California.

Secondary:

Architects, design-build firms, ADU builders, construction firms, adaptive reuse operators, private property buyers.

Do not target municipalities, lenders, or consumers first unless there is a warm path.

## First Geography

Start with Bay Area / Central California.

Recommended first zones:

1. Oakland / Alameda County
2. San Jose / Santa Clara County
3. Berkeley / East Bay
4. Sacramento
5. Central Valley cities within reach of the Bay

Use San Francisco selectively for adaptive reuse / lighthouse cases, but avoid making SF the only V1 market because complexity is high.

## First Property Types

Recommended V1 property types:

1. Single-family home with ADU / SB9 / lot-split / expansion potential
2. Small multifamily property
3. Vacant residential lot
4. Small mixed-use building
5. Underused commercial or hospitality property

Avoid in V1:

- large office-to-residential conversion,
- full ground-up master-planned development,
- highly regulated affordable housing finance,
- complex lending/underwriting products,
- construction robotics,
- hardware/OS-level deployment.

## Core Offer

Full Property Opportunity Brief.

The brief should be useful before a buyer/developer spends serious money on architects, attorneys, engineers, contractors, expediters, lenders, or consultants.

## Output Format

V1:

- PDF report
- internal editable Markdown/HTML source
- structured JSON stored in database or files

Later:

- web dashboard
- editable report workspace
- client portal
- pro forma spreadsheet export
- portfolio comparison
- team collaboration

---

# 3. Full Property Opportunity Brief Structure

## 1. Executive Summary

Answer:

- What is the opportunity?
- What are the best scenarios?
- What is the main risk?
- What is the recommendation?

Include:

- pursue / investigate / renegotiate / walk away
- confidence level
- top 3 findings
- top 3 risks
- next actions

## 2. Property Snapshot

Include:

- address
- parcel number if available
- city/county
- lot size
- building size
- current use
- year built if available
- current listing/asking price if applicable
- photos/maps if available
- source notes

## 3. Location Context

Include:

- neighborhood context
- access/transit
- nearby amenities
- nearby development activity
- market demand notes
- potential resident/customer profile
- local constraints

## 4. Zoning and Land Use Summary

Include:

- zoning designation
- allowed uses
- density/FAR/height/setback notes if available
- parking requirements if available
- ADU/SB9/multifamily potential if relevant
- known overlays
- permit/code unknowns
- source links
- verification required

Important:

Never present zoning as final legal advice. Mark low-confidence items clearly.

## 5. Existing Conditions

Include:

- current building condition if known
- visible site constraints
- access/parking
- utility unknowns
- topography/environmental concerns
- fire/flood/seismic considerations if relevant
- demolition/renovation considerations

## 6. Development Scenarios

Generate 3-5 scenarios.

Default scenarios:

1. Conservative scenario
2. Max-yield scenario
3. Affordable/sustainable scenario
4. Adaptive reuse scenario, if relevant
5. Hospitality/short-term rental scenario, if relevant

Each scenario should include:

- description
- target use
- unit count or rentable area
- construction approach
- estimated timeline
- rough cost
- rough revenue/rent/sale potential
- major risks
- recommendation

## 7. Cost Model

Include rough estimates for:

- acquisition price
- hard costs
- soft costs
- design/engineering
- permitting/fees
- contingency
- financing/carry
- total development cost

Important:

Costs should be assumptions, not certified estimates.

## 8. Revenue / Value Model

Include where relevant:

- rent assumptions
- sale assumptions
- short-term rental assumptions
- NOI assumptions
- exit value assumptions
- sensitivity range
- break-even notes

## 9. Simple Pro Forma

Include:

- total cost
- projected revenue/value
- estimated margin
- estimated yield
- key assumptions
- sensitivity table

V1 can be simple. Do not overcomplicate.

## 10. Affordability / Sustainability / Community Impact

Include:

- potential number of housing units
- affordable housing potential
- lower-cost construction ideas
- adaptive reuse potential
- sustainability/material ideas
- local workforce/community benefits
- displacement concerns
- quality-of-life considerations

This section should be practical, not fluffy.

## 11. Risk Register

Include:

- zoning risk
- permitting risk
- construction risk
- financing risk
- market risk
- environmental/site risk
- data-confidence risk
- political/community risk
- legal/professional review risk

Each risk should include:

- severity
- likelihood
- reason
- mitigation
- who should verify it

## 12. Recommendation

Include:

- pursue / investigate / renegotiate / walk away
- best scenario
- second-best scenario
- what must be verified next
- what decision this brief supports

## 13. Next-Step Checklist

Include:

- call planning department
- verify zoning
- request permit history
- talk to architect
- talk to GC
- get survey
- request utility info
- verify financing assumptions
- inspect property
- refine pro forma
- review legal constraints

## 14. Sources and Assumptions

Include:

- source list
- assumptions list
- data confidence
- human review notes
- disclaimer

---

# 4. V1 Product Workflow

## Client-Facing Flow

1. Client submits property/address/documents.
2. Client answers intake questions.
3. Internal system creates property workspace.
4. AI drafts property brief sections.
5. Human reviews and edits.
6. Final PDF is delivered.
7. Client gives feedback.
8. Feedback improves template and workflow.

## Internal Flow

1. Create property record.
2. Upload documents.
3. Extract text.
4. Gather manual/public data.
5. Fill assumptions.
6. Generate scenarios.
7. Generate cost/revenue assumptions.
8. Generate risk register.
9. Compose report.
10. Human review.
11. Export PDF.
12. Save final version.

---

# 5. Intake Form

## Required Inputs

- address or parcel
- client name/company
- client role
- property type
- intended use
- known asking price or acquisition price
- desired outcome
- timeline urgency
- uploaded files if available

## Optional Inputs

- target unit count
- target rent/sale price
- construction budget
- financing assumptions
- preferred scenario
- sustainability goals
- affordability goals
- notes from broker/architect/contractor
- photos/plans/listings

## Key Intake Questions

1. What are you trying to decide?
2. Are you considering buying, building, converting, selling, or redesigning?
3. What is your target outcome?
4. What is your budget or acquisition price?
5. What timeline are you working under?
6. What assumptions do you already have?
7. What concerns you most about this property?
8. Who else is involved in the decision?
9. What would make this a good deal?
10. What would make you walk away?

---

# 6. Data Model

## User

- id
- name
- email
- organization_id
- role
- created_at

## Organization

- id
- name
- type
- billing_status
- created_at

## Property

- id
- organization_id
- address
- parcel_number
- city
- county
- state
- latitude
- longitude
- lot_size
- building_size
- current_use
- year_built
- source_notes
- created_at
- updated_at

## Document

- id
- property_id
- file_name
- file_type
- storage_url
- extracted_text
- document_type
- created_at

## Source

- id
- property_id
- title
- url
- source_type
- retrieved_at
- notes
- confidence

## Assumption

- id
- property_id
- category
- label
- value
- unit
- confidence
- source_id
- human_verified
- created_at
- updated_at

## Scenario

- id
- property_id
- name
- description
- use_type
- estimated_units
- estimated_building_area
- estimated_cost
- estimated_revenue
- estimated_timeline
- risk_level
- recommendation
- assumptions_json
- created_at
- updated_at

## Risk

- id
- property_id
- scenario_id
- category
- description
- severity
- likelihood
- mitigation
- verification_owner
- created_at

## Report

- id
- property_id
- title
- status
- report_json
- html_output
- pdf_url
- reviewer_notes
- created_at
- updated_at

---

# 7. AI Modules

Keep V1 simple. Use modules before complex agents.

## 1. Intake Normalizer

Turns raw user input into a clean property/project summary.

## 2. Document Extractor

Extracts useful facts from uploaded PDFs, listings, notes, images, and plans where possible.

## 3. Research Assistant

Helps summarize public data and source notes.

## 4. Zoning Summary Module

Produces a cautious zoning/land-use summary with source notes and verification flags.

## 5. Scenario Generator

Creates 3-5 possible development paths.

## 6. Cost Assumption Module

Creates rough cost assumptions with confidence levels.

## 7. Revenue Assumption Module

Creates rough rent/sale/revenue assumptions.

## 8. Pro Forma Module

Creates a simple financial model from assumptions.

## 9. Risk Register Module

Identifies project risks and required verification.

## 10. Report Composer

Turns structured sections into a polished report.

## 11. Human Review Checklist Generator

Creates a checklist of items requiring human/professional verification.

---

# 8. Technical Stack

## Recommended V1 Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Postgres
- Supabase Storage
- Supabase Auth
- pgvector later, not required on day one
- PostGIS later, useful but not required on day one
- Vercel AI SDK or direct model calls
- Zod for schemas
- React Hook Form for intake
- HTML-to-PDF export
- Stripe later

## Testing

- Vitest for unit tests
- Playwright for critical user flows
- Zod validation for all AI outputs
- Golden test files for sample reports
- Snapshot tests for report sections
- Manual review checklist for every delivered report

## Suggested Repo Structure

```txt
/property-intelligence
  /app
    /dashboard
    /properties
    /reports
    /intake
  /components
    /ui
    /forms
    /reports
    /property
  /lib
    /ai
    /schemas
    /db
    /reports
    /pdf
    /sources
  /modules
    /intake
    /documents
    /zoning
    /market
    /scenarios
    /costs
    /proforma
    /risks
    /composer
  /tests
    /fixtures
    /unit
    /e2e
  /docs
    v1-spec.md
    report-template.md
    outreach.md
```

---

# 9. V1 Screens

## Must Have

1. Internal dashboard
2. New property intake form
3. Property workspace
4. Document upload
5. Assumptions editor
6. Scenario editor
7. Report editor/preview
8. Export PDF

## Nice to Have

1. Client login
2. Map view
3. Property comparison
4. Comments
5. Billing
6. Team collaboration
7. Portfolio dashboard

Do not build nice-to-have features before delivering first briefs.

---

# 10. Build Order

## Phase 0: Decide

- pick first geography
- pick first 3 demo properties
- pick first report template
- pick first price test
- pick first outreach list

## Phase 1: Report Template

Build the final output first.

- Markdown report template
- HTML report template
- PDF export
- report sections
- sample assumptions
- sample risk register

## Phase 2: Internal Tool

- intake form
- property record
- document upload
- manual data entry
- report editor
- scenario editor
- export flow

## Phase 3: AI Drafting

- structured output schemas
- section draft generation
- scenario generation
- risk generation
- assumption extraction
- review checklist generation

## Phase 4: Paid Pilots

- sell 3 paid reports
- deliver manually assisted briefs
- collect feedback
- track time per report
- identify repeated tasks
- refine pricing

## Phase 5: Client Workspace

Only after payment validation.

- client dashboard
- saved reports
- multi-property pipeline
- comments/revisions
- recurring billing

---

# 11. Pricing Tests

## Option A: Pilot Pricing

- $500-$1,000 for first 3 pilot briefs
- goal: feedback and testimonials

## Option B: Serious Paid Report

- $1,500-$5,000 per brief
- goal: prove commercial value

## Option C: Monthly Deal Desk

- $2,000-$10,000/month
- includes set number of properties/reports
- goal: recurring revenue

Recommendation:

Start with $1,500-$2,500 for first serious briefs if quality is strong. Discount only in exchange for detailed feedback, permission to use anonymized case study, or referrals.

---

# 12. Outreach Questions for Prospects

Ask these in calls:

1. How do you currently evaluate a new property opportunity?
2. What takes the longest?
3. What do you pay consultants for before deciding whether to pursue?
4. What mistakes have cost you money?
5. What information do you wish you had earlier?
6. How many properties do you evaluate per month?
7. How many do you reject?
8. What would make you reject a property faster?
9. What would make you pursue one faster?
10. Would a brief like this be useful?
11. What would be missing?
12. What would you pay for it?
13. Would you pay monthly for a deal desk?
14. Who else on your team would use it?
15. Can we analyze one property for you?

---

# 13. Success Criteria

## Before Building Full SaaS

Need at least:

- 10-15 operator conversations
- 3 sample briefs
- 3 paid or serious pilot briefs
- clear evidence of willingness to pay
- clear repeated workflow
- clear buyer profile
- clear must-have report sections

## Product Metrics

- time to produce report
- number of manual steps
- number of AI-generated usable sections
- number of human edits required
- confidence score accuracy
- client usefulness score
- repeat interest

## Business Metrics

- report price
- close rate
- repeat purchase interest
- monthly deal desk interest
- referrals
- time saved for client
- decisions influenced

---

# 14. Legal / Trust Rules

Every report must state:

- This is decision support only.
- This is not legal advice.
- This is not architectural, engineering, appraisal, tax, or investment advice.
- Zoning/code findings must be verified with the relevant jurisdiction and licensed professionals.
- Cost/revenue assumptions are estimates only.
- Low-confidence assumptions are flagged.
- Sources and assumptions are included.

Do not make final claims like:

- "You can definitely build this."
- "This will be approved."
- "This investment will return X."
- "This is legally compliant."
- "This cost estimate is guaranteed."

Use:

- "Potentially feasible subject to verification."
- "Initial indication suggests."
- "Requires confirmation."
- "Assumption for modeling only."
- "Professional review required."

---

# 15. Mission Guardrails

The product should help clients see more than profit.

Every brief should include:

- affordability potential
- sustainability/material considerations
- community impact
- displacement risk
- local workforce potential
- adaptive reuse potential where relevant

The product should not become only a rent-extraction optimizer.

Long-term mission:

Use intelligence to reduce waste, lower development friction, support better housing, empower smaller operators, and help create more humane built environments.

---

# 16. What Not to Build Yet

Do not build in V1:

- hardware device
- OS/BIOS-level system
- consumer app
- lending/loan product
- tokenized real estate
- full CAD/BIM replacement
- fully automated permitting
- municipality-first workflow
- construction robotics
- marketplace
- complex agent framework before workflows are proven

---

# 17. Immediate Action Plan

## Today / Next Session

1. Finalize this V1 spec.
2. Pick first geography.
3. Pick first 3 demo properties.
4. Create the report template.
5. Create outreach list.

## Next 3-7 Days

1. Build static report template.
2. Build first manual sample brief.
3. Build intake form.
4. Build internal report editor.
5. Reach out to 10 prospects.
6. Schedule feedback calls.

## Next 2 Weeks

1. Complete 3 sample briefs.
2. Get feedback from real operators.
3. Sell first paid pilot.
4. Identify repeated workflow.
5. Begin automating the highest-value parts.

## Next 30 Days

1. Deliver 3 paid/pilot briefs.
2. Build internal MVP.
3. Decide first recurring offer.
4. Refine pricing.
5. Build case studies.
6. Decide whether to expand into SaaS dashboard.

---

# 18. Final Decision Needed

Before coding too much, answer:

1. First geography?
2. First property type?
3. First buyer?
4. First report price?
5. First 3 demo properties?
6. First outreach list?
7. Who reviews final reports?
8. What sections are mandatory?
9. What can be manual?
10. What must be automated first?

Once these are answered, build the report template and internal tool.
