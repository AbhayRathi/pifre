import { PropertyRecord } from "../schemas/property";
import { Scenario } from "../schemas/scenario";
import { Risk } from "../schemas/risk";

export interface MockProperty {
  property: PropertyRecord;
  scenarios: Scenario[];
  risks: Risk[];
  assumptions: Record<string, number | string>;
}

export const mockProperties: MockProperty[] = [
  {
    property: {
      id: "oakland-adu-expansion",
      address: "4217 Martin Luther King Jr Way",
      city: "Oakland",
      county: "Alameda",
      state: "CA",
      latitude: 37.8324,
      longitude: -122.2712,
      parcelNumber: "012-0987-001",
      lotSizeSqFt: 5200,
      buildingSizeSqFt: 1400,
      currentUse: "Single Family Residential",
      zoning: "RM-2 (Mixed Housing Type Residential)",
      yearBuilt: 1923,
      sourceRecords: [
        {
          id: "src-oak-1",
          sourceName: "Alameda County Assessor",
          sourceType: "assessor",
          title: "Property assessment record",
          url: "https://data.acgov.org/",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "high",
          notes: "Fallback/demo data based on typical Oakland residential property",
        },
        {
          id: "src-oak-2",
          sourceName: "Oakland Planning & Zoning",
          sourceType: "zoning",
          title: "Zoning classification RM-2",
          url: "https://www.oaklandca.gov/topics/zoning",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "medium",
          notes: "Zoning from public map - verify with Planning Department",
        },
      ],
      dataQuality: "fallback",
    },
    scenarios: [
      {
        id: "oak-s1",
        name: "Conservative Improvement",
        type: "conservative",
        description:
          "Renovate existing home, add permitted garage conversion. Minimal entitlement risk.",
        estimatedUnits: { min: 1, max: 2 },
        estimatedCost: { min: 150000, max: 250000 },
        estimatedValue: { min: 850000, max: 1050000 },
        timeline: "6-9 months",
        riskLevel: "low",
        confidence: "high",
        recommendation: "Low-risk entry point. Good if holding long-term or testing ADU market.",
        massingConfig: {
          mainBuilding: { width: 30, depth: 40, height: 25, color: "#8B7355" },
          parking: true,
          greenSpace: true,
        },
      },
      {
        id: "oak-s2",
        name: "ADU + Junior ADU",
        type: "adu_expansion",
        description:
          "Add detached ADU (600sf) in rear yard plus JADU conversion in existing structure. SB 9 compliant.",
        estimatedUnits: { min: 3, max: 3 },
        estimatedCost: { min: 280000, max: 420000 },
        estimatedValue: { min: 1200000, max: 1500000 },
        timeline: "10-14 months",
        riskLevel: "medium",
        confidence: "high",
        recommendation:
          "Strong cashflow play. ADU rent covers carrying costs. SB 9 streamlines approvals.",
        massingConfig: {
          mainBuilding: { width: 30, depth: 40, height: 25, color: "#8B7355" },
          adu: { width: 20, depth: 30, height: 15, color: "#A0926B" },
          parking: true,
          greenSpace: true,
        },
      },
      {
        id: "oak-s3",
        name: "Max Yield Multifamily",
        type: "max_yield",
        description:
          "Demolish and build 4-6 unit multifamily under RM-2 zoning. Maximum density play.",
        estimatedUnits: { min: 4, max: 6 },
        estimatedCost: { min: 1200000, max: 1800000 },
        estimatedValue: { min: 2200000, max: 3000000 },
        timeline: "18-24 months",
        riskLevel: "high",
        confidence: "medium",
        recommendation:
          "Highest return but requires significant capital and entitlement navigation. Verify density bonus eligibility.",
        massingConfig: {
          mainBuilding: { width: 40, depth: 50, height: 40, color: "#6B5B4F" },
          additionalStructures: [
            { width: 15, depth: 20, height: 12, color: "#7A6B5D", label: "Parking" },
          ],
          parking: true,
          greenSpace: false,
          communityArea: true,
        },
      },
      {
        id: "oak-s4",
        name: "Affordable / Community Housing",
        type: "affordable_sustainable",
        description:
          "Partner with affordable housing developer. Utilize density bonus and tax credits for 100% affordable project.",
        estimatedUnits: { min: 6, max: 8 },
        estimatedCost: { min: 1800000, max: 2400000 },
        estimatedValue: { min: 2000000, max: 2800000 },
        timeline: "24-36 months",
        riskLevel: "medium",
        confidence: "medium",
        recommendation:
          "Lower direct profit but significant community impact. Tax credits and density bonus offset costs. Requires affordable housing partner.",
        massingConfig: {
          mainBuilding: { width: 45, depth: 55, height: 45, color: "#5D7A5D" },
          additionalStructures: [
            { width: 20, depth: 15, height: 10, color: "#6B8B6B", label: "Community" },
          ],
          parking: true,
          greenSpace: true,
          communityArea: true,
        },
      },
    ],
    risks: [
      {
        id: "r-oak-1",
        category: "zoning",
        severity: "medium",
        likelihood: "possible",
        summary: "RM-2 allows multifamily but design review may require modifications",
        mitigation:
          "Pre-application meeting with Oakland Planning. Review design guidelines early.",
        verifiedBy: "Land use attorney or planning consultant",
      },
      {
        id: "r-oak-2",
        category: "permitting",
        severity: "medium",
        likelihood: "likely",
        summary: "Oakland permit timelines are 6-12 months for multifamily",
        mitigation:
          "Submit complete application. Use permit expediter. Consider SB 35 streamlining if affordable.",
        verifiedBy: "Permit expediter",
      },
      {
        id: "r-oak-3",
        category: "construction",
        severity: "high",
        likelihood: "possible",
        summary: "1923 structure may have lead, asbestos, or foundation issues requiring abatement",
        mitigation:
          "Phase I environmental assessment before acquisition. Budget 15% contingency for hazmat.",
        verifiedBy: "Environmental consultant",
      },
      {
        id: "r-oak-4",
        category: "financing",
        severity: "medium",
        likelihood: "possible",
        summary:
          "Construction lending rates elevated. LTV constraints may require additional equity.",
        mitigation:
          "Secure term sheet before close. Explore CDFIs or mission-aligned lenders for affordable scenarios.",
        verifiedBy: "Construction lender",
      },
      {
        id: "r-oak-5",
        category: "market",
        severity: "low",
        likelihood: "unlikely",
        summary: "Oakland rental demand remains strong but rents may face downward pressure",
        mitigation: "Underwrite conservatively. Target below-market achievable rents.",
        verifiedBy: "Market analyst or appraiser",
      },
      {
        id: "r-oak-6",
        category: "data_confidence",
        severity: "medium",
        likelihood: "likely",
        summary: "Property data is from fallback/demo sources and needs verification",
        mitigation:
          "Pull title report, confirm parcel/zoning with county, verify lot dimensions with survey.",
        verifiedBy: "Title company and surveyor",
      },
    ],
    assumptions: {
      acquisitionPrice: 750000,
      lotSize: 5200,
      buildingSize: 1400,
      targetUnits: 4,
      hardCostPerSqFt: 350,
      softCostPercentage: 25,
      contingencyPercentage: 15,
      targetRent: 2800,
      targetSaleValue: 550000,
      financingNotes: "Conventional construction loan at 8.5%. 12-month term.",
    },
  },
  {
    property: {
      id: "san-jose-vacant-lot",
      address: "1850 Almaden Expressway",
      city: "San Jose",
      county: "Santa Clara",
      state: "CA",
      latitude: 37.2871,
      longitude: -121.8674,
      parcelNumber: "434-12-089",
      lotSizeSqFt: 12500,
      buildingSizeSqFt: 0,
      currentUse: "Vacant Land",
      zoning: "R-M (Multiple Residence)",
      yearBuilt: undefined,
      sourceRecords: [
        {
          id: "src-sj-1",
          sourceName: "San Jose GIS Open Data",
          sourceType: "gis",
          title: "Parcel boundaries and zoning",
          url: "https://gisdata-csj.opendata.arcgis.com/",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "medium",
          notes: "Fallback/demo data based on San Jose zoning maps",
        },
        {
          id: "src-sj-2",
          sourceName: "Santa Clara County Assessor",
          sourceType: "assessor",
          title: "Parcel assessment - vacant land",
          url: "https://www.sccassessor.org/",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "medium",
          notes: "Assessment data pending real API integration",
        },
      ],
      dataQuality: "fallback",
    },
    scenarios: [
      {
        id: "sj-s1",
        name: "Townhome Development",
        type: "conservative",
        description:
          "Build 4-6 attached townhomes. Established product type for the area. Straightforward entitlements.",
        estimatedUnits: { min: 4, max: 6 },
        estimatedCost: { min: 2200000, max: 3200000 },
        estimatedValue: { min: 4000000, max: 5500000 },
        timeline: "18-24 months",
        riskLevel: "medium",
        confidence: "medium",
        recommendation:
          "Strong market fit for San Jose. Townhomes sell well in this corridor. Manageable scale.",
        massingConfig: {
          mainBuilding: { width: 50, depth: 35, height: 30, color: "#7A6B5D" },
          additionalStructures: [
            { width: 50, depth: 35, height: 30, color: "#8B7B6D", label: "Units 4-6" },
          ],
          parking: true,
          greenSpace: true,
        },
      },
      {
        id: "sj-s2",
        name: "Small Multifamily (8-12 units)",
        type: "max_yield",
        description:
          "Maximize density under R-M zoning. Podium or wrap-style with structured parking.",
        estimatedUnits: { min: 8, max: 12 },
        estimatedCost: { min: 4500000, max: 6500000 },
        estimatedValue: { min: 7000000, max: 9500000 },
        timeline: "24-30 months",
        riskLevel: "high",
        confidence: "medium",
        recommendation:
          "High yield but complex. Requires strong GC and capital stack. Verify parking ratios with city.",
        massingConfig: {
          mainBuilding: { width: 55, depth: 60, height: 45, color: "#5D5247" },
          additionalStructures: [
            { width: 30, depth: 55, height: 12, color: "#6B6055", label: "Parking" },
          ],
          parking: true,
          greenSpace: false,
          communityArea: true,
        },
      },
      {
        id: "sj-s3",
        name: "Mixed-Use with Retail",
        type: "adaptive_reuse",
        description:
          "Ground-floor retail/commercial with residential above. Leverage corner visibility.",
        estimatedUnits: { min: 6, max: 10 },
        estimatedCost: { min: 3800000, max: 5500000 },
        estimatedValue: { min: 5500000, max: 8000000 },
        timeline: "24-36 months",
        riskLevel: "high",
        confidence: "low",
        recommendation:
          "Interesting concept but retail risk is significant. Verify commercial demand with local brokers first.",
        massingConfig: {
          mainBuilding: { width: 55, depth: 55, height: 50, color: "#4F5D4F" },
          additionalStructures: [
            { width: 55, depth: 20, height: 15, color: "#6B7A6B", label: "Retail" },
          ],
          parking: true,
          greenSpace: true,
          communityArea: true,
        },
      },
    ],
    risks: [
      {
        id: "r-sj-1",
        category: "zoning",
        severity: "low",
        likelihood: "unlikely",
        summary: "R-M zoning supports intended use. No variance needed for residential.",
        mitigation: "Confirm FAR and height limits with planning staff.",
        verifiedBy: "Planning department pre-app",
      },
      {
        id: "r-sj-2",
        category: "environmental",
        severity: "high",
        likelihood: "possible",
        summary: "Vacant lot may have prior commercial use. Soil contamination possible.",
        mitigation: "Phase I ESA before closing. Budget for Phase II if flags found.",
        verifiedBy: "Environmental consultant",
      },
      {
        id: "r-sj-3",
        category: "construction",
        severity: "medium",
        likelihood: "likely",
        summary: "San Jose labor market is tight. GC availability and pricing volatile.",
        mitigation: "Lock in GC early. Use fixed-price contracts where possible.",
        verifiedBy: "General contractor bids",
      },
      {
        id: "r-sj-4",
        category: "market",
        severity: "medium",
        likelihood: "possible",
        summary: "South Bay condo/rental market depends on tech sector stability",
        mitigation: "Diversify unit types. Include some affordable units for stability.",
        verifiedBy: "Market study",
      },
      {
        id: "r-sj-5",
        category: "data_confidence",
        severity: "medium",
        likelihood: "likely",
        summary: "Lot size and zoning from fallback data need verification",
        mitigation: "Order ALTA survey and title report",
        verifiedBy: "Surveyor and title company",
      },
    ],
    assumptions: {
      acquisitionPrice: 1500000,
      lotSize: 12500,
      buildingSize: 0,
      targetUnits: 8,
      hardCostPerSqFt: 400,
      softCostPercentage: 22,
      contingencyPercentage: 12,
      targetRent: 3200,
      targetSaleValue: 700000,
      financingNotes: "Construction loan 75% LTC. 24-month term. Mini-perm takeout.",
    },
  },
  {
    property: {
      id: "sf-adaptive-reuse",
      address: "1455 Market Street",
      city: "San Francisco",
      county: "San Francisco",
      state: "CA",
      latitude: 37.7749,
      longitude: -122.4194,
      parcelNumber: "3507-005",
      lotSizeSqFt: 8400,
      buildingSizeSqFt: 22000,
      currentUse: "Commercial Office (Vacant)",
      zoning: "NCT-3 (Neighborhood Commercial Transit)",
      yearBuilt: 1962,
      sourceRecords: [
        {
          id: "src-sf-1",
          sourceName: "SF Assessor - Secured Property Tax Rolls",
          sourceType: "assessor",
          title: "Property assessment and building data",
          url: "https://data.sfgov.org/Housing-and-Buildings/Assessor-Historical-Secured-Property-Tax-Rolls/wv5m-vpq2",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "high",
          notes: "Fallback/demo data structured per SF OpenData schema",
        },
        {
          id: "src-sf-2",
          sourceName: "SF Planning - Zoning",
          sourceType: "zoning",
          title: "NCT-3 zoning district classification",
          url: "https://sfplanning.org/zoning",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "high",
          notes: "Zoning from SF Planning property information map",
        },
        {
          id: "src-sf-3",
          sourceName: "SF DBI Permit History",
          sourceType: "permit",
          title: "Building permit records",
          url: "https://data.sfgov.org/Housing-and-Buildings/Building-Permits/i98e-djp9",
          retrievedAt: "2024-01-15T10:00:00Z",
          confidence: "medium",
          notes: "Permit data available but specific records need address-level query",
        },
      ],
      dataQuality: "fallback",
    },
    scenarios: [
      {
        id: "sf-s1",
        name: "Office-to-Residential Conversion",
        type: "adaptive_reuse",
        description:
          "Convert vacant office to 18-24 residential units under AB 1490 / local conversion incentives.",
        estimatedUnits: { min: 18, max: 24 },
        estimatedCost: { min: 5500000, max: 8000000 },
        estimatedValue: { min: 12000000, max: 16000000 },
        timeline: "18-24 months",
        riskLevel: "medium",
        confidence: "medium",
        recommendation:
          "Strong fit for current market. SF actively incentivizing office-to-residential. Verify structural suitability and floor plate efficiency.",
        massingConfig: {
          mainBuilding: { width: 50, depth: 60, height: 55, color: "#6B5B4F" },
          parking: true,
          greenSpace: false,
          communityArea: true,
        },
      },
      {
        id: "sf-s2",
        name: "Mixed-Use Residential + Ground Retail",
        type: "max_yield",
        description:
          "Full conversion with ground-floor retail/restaurant space. Maximize NCT-3 allowances.",
        estimatedUnits: { min: 20, max: 28 },
        estimatedCost: { min: 7000000, max: 10000000 },
        estimatedValue: { min: 15000000, max: 20000000 },
        timeline: "24-30 months",
        riskLevel: "high",
        confidence: "medium",
        recommendation:
          "Maximum value extraction. Ground-floor retail adds complexity but also income diversification. Market Street location supports retail.",
        massingConfig: {
          mainBuilding: { width: 50, depth: 60, height: 60, color: "#4F4540" },
          additionalStructures: [
            { width: 50, depth: 25, height: 18, color: "#7A6B5D", label: "Retail" },
          ],
          parking: true,
          greenSpace: false,
          communityArea: true,
        },
      },
      {
        id: "sf-s3",
        name: "Affordable Housing Conversion",
        type: "affordable_sustainable",
        description:
          "100% affordable conversion utilizing AB 2011, density bonus, and tax credits. Partner with MOHCD.",
        estimatedUnits: { min: 24, max: 30 },
        estimatedCost: { min: 6000000, max: 9000000 },
        estimatedValue: { min: 8000000, max: 12000000 },
        timeline: "24-36 months",
        riskLevel: "medium",
        confidence: "medium",
        recommendation:
          "Lower direct margins but de-risked approvals, tax credits, and guaranteed tenant pipeline. Strong community goodwill. Requires LIHTC/tax credit expertise.",
        massingConfig: {
          mainBuilding: { width: 50, depth: 60, height: 60, color: "#4F6B4F" },
          additionalStructures: [
            { width: 25, depth: 20, height: 12, color: "#5D8B5D", label: "Community" },
          ],
          parking: true,
          greenSpace: true,
          communityArea: true,
        },
      },
    ],
    risks: [
      {
        id: "r-sf-1",
        category: "construction",
        severity: "high",
        likelihood: "likely",
        summary: "Office-to-residential conversion requires significant MEP and structural work",
        mitigation:
          "Engage structural engineer early. Assess floor plate depth for residential viability. Budget $80-120/sf conversion premium.",
        verifiedBy: "Structural engineer + architect",
      },
      {
        id: "r-sf-2",
        category: "permitting",
        severity: "medium",
        likelihood: "possible",
        summary: "SF Planning review timeline uncertain despite conversion incentives",
        mitigation: "Use AB 1490 ministerial pathway if eligible. Engage permit consultant.",
        verifiedBy: "Planning consultant",
      },
      {
        id: "r-sf-3",
        category: "financing",
        severity: "high",
        likelihood: "likely",
        summary:
          "Large capital requirement ($5-10M+) requires institutional capital or syndication",
        mitigation:
          "Structure as JV or fund investment. Explore PACE financing for energy improvements.",
        verifiedBy: "Capital advisor",
      },
      {
        id: "r-sf-4",
        category: "market",
        severity: "medium",
        likelihood: "possible",
        summary: "SF residential absorption rates recovering but not pre-pandemic levels",
        mitigation: "Phase delivery if possible. Pre-lease/pre-sell where market supports.",
        verifiedBy: "Market analyst",
      },
      {
        id: "r-sf-5",
        category: "environmental",
        severity: "medium",
        likelihood: "possible",
        summary: "1962 building likely has asbestos and lead. Seismic concerns.",
        mitigation:
          "Phase I ESA + seismic assessment pre-closing. Budget soft-story retrofit if needed.",
        verifiedBy: "Environmental + structural consultants",
      },
      {
        id: "r-sf-6",
        category: "community_political",
        severity: "low",
        likelihood: "unlikely",
        summary: "Community may oppose density or displacement concerns",
        mitigation:
          "Proactive community engagement. Include affordable units. Highlight office-to-housing benefits.",
        verifiedBy: "Community relations consultant",
      },
    ],
    assumptions: {
      acquisitionPrice: 4200000,
      lotSize: 8400,
      buildingSize: 22000,
      targetUnits: 22,
      hardCostPerSqFt: 300,
      softCostPercentage: 28,
      contingencyPercentage: 15,
      targetRent: 3500,
      targetSaleValue: 650000,
      financingNotes: "Bridge acquisition + construction. JV equity 40% / debt 60%. 30-month term.",
    },
  },
];

export function getMockPropertyById(id: string): MockProperty | undefined {
  return mockProperties.find((p) => p.property.id === id);
}

export function getAllMockProperties(): MockProperty[] {
  return mockProperties;
}
