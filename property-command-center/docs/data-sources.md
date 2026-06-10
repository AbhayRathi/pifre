# Data Sources

## Overview

Property Command Center uses a real-data-first architecture. Public data adapters attempt to fetch information from official open data portals before falling back to demo data.

## San Francisco Property Data

**Portal:** [DataSF](https://datasf.org/opendata/)

**Endpoints Used:**
- Assessor Historical Secured Property Tax Rolls: `https://data.sfgov.org/resource/wv5m-vpq2.json`
- Building Permits: `https://data.sfgov.org/resource/i98e-djp9.json`
- Zoning Districts: `https://data.sfgov.org/resource/xvjh-ra6g.json`

**Data Available:** Property assessments, lot area, building area, year built, property class, assessed values.

**Status:** Active adapter. No API key required for basic SODA queries.

**Limitations:** Address matching requires exact format. Historical data may lag 6-12 months.

---

## San Jose GIS Open Data

**Portal:** [San Jose GIS](https://gisdata-csj.opendata.arcgis.com/)

**Endpoints Used:**
- Zoning Districts Feature Layer
- Parcels Feature Layer
- General Plan Land Use

**Data Available:** Parcel boundaries, zoning classifications, general plan designations.

**Status:** Partial adapter. Search-based queries implemented; spatial queries need coordinate geocoding.

**Limitations:** Requires geocoding step to convert addresses to coordinates for spatial queries.

---

## Alameda County Open Data

**Portal:** [Alameda County Data](https://data.acgov.org/)

**Endpoints Used:**
- Parcel data
- Assessor records

**Data Available:** Parcel boundaries, assessment values, ownership records.

**Status:** Partial adapter. Basic search implemented; APN-based lookup needs refinement.

**Limitations:** Address format varies across cities within county. APN lookup is most reliable.

---

## California State Geoportal

**Portal:** [CA State Geoportal](https://gis.data.ca.gov/)

**Endpoints Used:**
- Statewide search API
- California Parcels (CALFIRE/Forestry)
- Protected Areas (CPAD Holdings)

**Data Available:** Statewide parcel geometry, environmental overlays, hazard zones.

**Status:** Partial adapter (fallback). Basic connectivity confirmed.

**Limitations:** State-level data is less specific than county/city sources. Best used as fallback or for environmental context.

---

## Future Paid Sources (Not in V1)

- **MLS/Market Comps:** Comparable sales, listing prices, rental rates
- **Construction Cost Databases:** RSMeans, BuildZoom, or equivalent
- **Permit Tracking:** BuildingEye, PermitFlow, or municipal APIs
- **Title/Ownership:** CoreLogic, ATTOM, or direct county recorder APIs
- **Environmental:** Phase I databases, flood zone data (FEMA), fire hazard severity zones

---

## Future Market Comps

Will integrate:
- Recent comparable sales within 0.5 mile radius
- Rental comps by unit type and size
- Price per square foot trends
- Days on market metrics
- Absorption rates

---

## Future Construction Cost Sources

Will integrate:
- Hard cost per SF by building type and location
- Material cost indices
- Labor rate data
- Historical cost escalation
- Permit fee schedules by jurisdiction

---

## Future Permit Data

Will integrate:
- Active permit applications nearby
- Permit timeline history for jurisdiction
- Common conditions of approval
- Appeal rates and timelines

---

## Data Limitations

1. **Timeliness:** Public data may lag weeks to months behind current records
2. **Completeness:** Not all jurisdictions have open data portals
3. **Accuracy:** Geocoding and address matching are imperfect
4. **Scope:** Zoning interpretation requires human judgment beyond raw classification
5. **Legal standing:** No public data query replaces official verification with jurisdiction

---

## Source Confidence Rules

| Confidence | Criteria |
|-----------|----------|
| **High** | Direct match from official source, current data, verified format |
| **Medium** | Partial match, source is official but data may be stale or incomplete |
| **Low** | No direct match, inference from nearby data, fallback/demo content |

All source records include:
- Source name and URL
- Retrieval timestamp
- Confidence level
- Notes on data quality
- Source type classification
