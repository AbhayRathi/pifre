/**
 * Report Template Configuration
 *
 * Defines the structure and sections of the Full Property Opportunity Brief.
 * This template will be used by AI report generation in future versions.
 *
 * Future RAG integration:
 * 1. User uploads property packet / PDF / plans / notes
 * 2. System extracts text and facts via document processing
 * 3. Facts are linked to source records with confidence levels
 * 4. Text chunks are embedded for semantic retrieval
 * 5. Report sections retrieve relevant facts from embeddings
 * 6. AI generates section content citing specific sources
 * 7. Human review verifies final output before delivery
 */

export const reportTemplate = {
  sections: [
    { id: "exec-summary", title: "Executive Summary", required: true },
    { id: "property-snapshot", title: "Property Snapshot", required: true },
    { id: "location-context", title: "Location Context", required: true },
    { id: "zoning-land-use", title: "Zoning / Land Use Summary", required: true },
    { id: "development-scenarios", title: "Development Scenarios", required: true },
    { id: "cost-revenue", title: "Cost / Revenue Snapshot", required: true },
    {
      id: "affordability-impact",
      title: "Affordability / Sustainability / Community Impact",
      required: true,
    },
    { id: "risk-register", title: "Risk Register", required: true },
    { id: "recommendation", title: "Recommendation", required: true },
    { id: "next-steps", title: "Next Steps", required: true },
    { id: "sources-assumptions", title: "Sources and Assumptions", required: true },
    { id: "disclaimer", title: "Disclaimer", required: true },
  ],
};
