import { Report, ReportSection } from "../schemas/report";
import { PropertyRecord } from "../schemas/property";
import { Scenario } from "../schemas/scenario";
import { Risk } from "../schemas/risk";
import { formatCurrency } from "../utils";

export const REPORT_DISCLAIMER = `DISCLAIMER: This Property Opportunity Brief is for decision-support purposes only. It is NOT legal, architectural, engineering, appraisal, tax, or investment advice. All zoning interpretations, building code assumptions, cost estimates, revenue projections, and market analyses require independent verification by qualified licensed professionals before any acquisition, design, construction, or investment decision. Past performance and current conditions do not guarantee future results. The user assumes all risk for decisions made based on this information.`;

export function buildReport(
  property: PropertyRecord,
  scenarios: Scenario[],
  risks: Risk[],
  assumptions: Record<string, number | string>
): Report {
  const sections: ReportSection[] = [
    {
      id: "exec-summary",
      title: "Executive Summary",
      content: `This Property Opportunity Brief analyzes ${property.address}, ${property.city}, ${property.state} — a ${property.lotSizeSqFt?.toLocaleString() || "unknown"} sq ft parcel currently used as ${property.currentUse || "unknown"}. The analysis evaluates ${scenarios.length} development scenarios ranging from conservative improvement to maximum-yield development. Data quality is assessed as "${property.dataQuality}" with ${property.sourceRecords.length} source records consulted.`,
      order: 1,
    },
    {
      id: "property-snapshot",
      title: "Property Snapshot",
      content: `Address: ${property.address}\nCity: ${property.city}, ${property.state}\nParcel: ${property.parcelNumber || "Pending verification"}\nLot Size: ${property.lotSizeSqFt?.toLocaleString() || "TBD"} sq ft\nBuilding: ${property.buildingSizeSqFt?.toLocaleString() || "N/A"} sq ft\nCurrent Use: ${property.currentUse || "Unknown"}\nZoning: ${property.zoning || "Pending verification"}\nYear Built: ${property.yearBuilt || "N/A"}`,
      order: 2,
    },
    {
      id: "location-context",
      title: "Location Context",
      content: `${property.city}, ${property.county ? `${property.county} County, ` : ""}California. Coordinates: ${property.latitude || "N/A"}, ${property.longitude || "N/A"}. Local market context, transit access, school quality, and neighborhood character require on-the-ground verification and are not fully captured in this automated brief.`,
      order: 3,
    },
    {
      id: "zoning-land-use",
      title: "Zoning / Land Use Summary",
      content: `Current Zoning: ${property.zoning || "Pending verification"}\n\nZoning determines allowable uses, density, height, setbacks, and parking requirements. This classification should be verified directly with the local planning department. State laws (SB 9, AB 2011, density bonus) may provide additional entitlements beyond base zoning.`,
      order: 4,
    },
    {
      id: "development-scenarios",
      title: "Development Scenarios",
      content: scenarios
        .map(
          (s) =>
            `**${s.name}** (${s.type})\n${s.description}\nUnits: ${s.estimatedUnits.min}-${s.estimatedUnits.max} | Cost: ${formatCurrency(s.estimatedCost.min)}-${formatCurrency(s.estimatedCost.max)} | Value: ${formatCurrency(s.estimatedValue.min)}-${formatCurrency(s.estimatedValue.max)}\nTimeline: ${s.timeline} | Risk: ${s.riskLevel} | Confidence: ${s.confidence}\nRecommendation: ${s.recommendation}`
        )
        .join("\n\n"),
      order: 5,
    },
    {
      id: "cost-revenue",
      title: "Cost / Revenue Snapshot",
      content: `| Assumption | Value |\n|---|---|\n| Acquisition Price | ${formatCurrency(Number(assumptions.acquisitionPrice) || 0)} |\n| Lot Size | ${Number(assumptions.lotSize || 0).toLocaleString()} sq ft |\n| Building Size | ${Number(assumptions.buildingSize || 0).toLocaleString()} sq ft |\n| Target Units | ${assumptions.targetUnits || 0} |\n| Hard Cost / SF | ${formatCurrency(Number(assumptions.hardCostPerSqFt) || 0)} |\n| Soft Costs | ${assumptions.softCostPercentage || 0}% of hard costs |\n| Contingency | ${assumptions.contingencyPercentage || 0}% |\n| Target Rent | ${formatCurrency(Number(assumptions.targetRent) || 0)}/month |\n| Target Sale Value | ${formatCurrency(Number(assumptions.targetSaleValue) || 0)}/unit |\n| Financing | ${assumptions.financingNotes || "TBD"} |\n\nAll figures are estimates based on assumptions and require independent verification by qualified professionals.`,
      order: 6,
    },
    {
      id: "affordability-impact",
      title: "Affordability / Sustainability / Community Impact",
      content: `Development decisions impact communities beyond financial returns. Consider:\n- Affordable unit inclusion (density bonus eligibility)\n- Displacement risk to existing tenants/neighbors\n- Environmental sustainability (energy efficiency, materials)\n- Community amenities and public benefit\n- Local hiring and workforce development\n- Transit-oriented design principles`,
      order: 7,
    },
    {
      id: "risk-register",
      title: "Risk Register",
      content: risks
        .map(
          (r) =>
            `[${r.severity.toUpperCase()}] ${r.category}: ${r.summary}\nLikelihood: ${r.likelihood} | Mitigation: ${r.mitigation}\nVerify with: ${r.verifiedBy}`
        )
        .join("\n\n"),
      order: 8,
    },
    {
      id: "recommendation",
      title: "Recommendation",
      content: `Based on the analysis of ${scenarios.length} scenarios and ${risks.length} identified risks, the recommended next steps depend on the investor/developer's risk tolerance, capital availability, and timeline requirements. The ${scenarios[0]?.name || "first scenario"} offers the most conservative path, while the ${scenarios[scenarios.length - 1]?.name || "last scenario"} maximizes potential but carries higher risk.`,
      order: 9,
    },
    {
      id: "next-steps",
      title: "Next Steps",
      content: `1. Verify all property data with official sources (title, survey, assessor)\n2. Confirm zoning and entitlement path with local planning\n3. Engage qualified professionals (architect, attorney, engineer)\n4. Obtain preliminary cost estimates from contractors\n5. Complete financial pro forma with verified assumptions\n6. Assess market with comparable sales/rental analysis\n7. Evaluate financing options and capital stack\n8. Make go/no-go decision based on verified data`,
      order: 10,
    },
    {
      id: "sources-assumptions",
      title: "Sources and Assumptions",
      content: `Data Sources (${property.sourceRecords.length}):\n${property.sourceRecords.map((s) => `- ${s.sourceName}: ${s.title} [${s.confidence} confidence]`).join("\n")}\n\nKey Assumptions:\n${Object.entries(
        assumptions
      )
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")}\n\nData Quality: ${property.dataQuality}`,
      order: 11,
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      content: `Data Confidence Level: ${property.dataQuality.toUpperCase()}\n\n${property.dataQuality === "fallback" ? "⚠️ This report uses FALLBACK data that has not been verified against live public records. All information must be independently confirmed before making any acquisition, design, or investment decision.\n\n" : property.dataQuality === "partial" ? "⚠️ This report uses PARTIAL data — some fields were retrieved from public sources but may be incomplete.\n\n" : ""}${REPORT_DISCLAIMER}`,
      order: 12,
    },
  ];

  return {
    id: `report-${property.id}-${Date.now()}`,
    propertyId: property.id,
    title: `Full Property Opportunity Brief: ${property.address}`,
    generatedAt: new Date().toISOString(),
    sections,
    disclaimer: REPORT_DISCLAIMER,
  };
}
