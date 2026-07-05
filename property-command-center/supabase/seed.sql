-- Seed data: 3 Bay Area demonstration properties with real publicly verifiable addresses

INSERT INTO properties (id, address, city, state, zip, parcel_number, zoning, lot_size_sqft, current_use, year_built, data_quality)
VALUES
  ('oakland-adu-expansion', '4521 Telegraph Ave', 'Oakland', 'CA', '94609', '014-1252-003-00', 'M-X (Mixed Use)', 5800, 'Mixed-Use Commercial/Residential', 1948, 'medium'),
  ('san-jose-vacant-lot', '2847 Story Rd', 'San Jose', 'CA', '95127', '484-26-024', 'R1-8 (Single Family Residential)', 7200, 'Vacant Land', NULL, 'medium'),
  ('sf-adaptive-reuse', '1532 Harrison St', 'San Francisco', 'CA', '94103', '3518-009', 'PDR-1-G (Production, Distribution & Repair)', 9600, 'Industrial/Warehouse (Vacant)', 1955, 'medium');

-- Oakland scenarios (ADU expansion on mixed-use site)
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('oakland-adu-expansion', 'Conservative Improvement', 'conservative', 'Renovate existing structure, add permitted ADU in rear yard (600 sf detached unit). Minimal entitlement risk under California AB 68/SB 13.', 240000, 360000, 950000, 1200000, 8, 12, 'high'),
  ('oakland-adu-expansion', 'ADU + Junior ADU', 'adu_expansion', 'Add detached ADU (800 sf) plus JADU conversion (500 sf) within existing structure. Two additional units by-right under state ADU law.', 380000, 520000, 1400000, 1750000, 10, 14, 'high'),
  ('oakland-adu-expansion', 'Mixed-Use Redevelopment', 'max_yield', 'Demolish and build 6-8 unit mixed-use building with ground-floor commercial under M-X zoning. Requires design review.', 2400000, 3600000, 3800000, 5200000, 18, 24, 'medium'),
  ('oakland-adu-expansion', 'Affordable Housing Partnership', 'affordable_sustainable', 'Partner with affordable housing developer utilizing density bonus and LIHTC credits for 10-12 units.', 3200000, 4800000, 3600000, 5000000, 24, 36, 'medium');

-- San Jose scenarios (vacant lot development)
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('san-jose-vacant-lot', 'Single Family + ADU', 'conservative', 'Build single family home (1,800 sf) with detached ADU (600 sf). Straightforward R1-8 by-right development.', 720000, 960000, 1400000, 1800000, 10, 14, 'high'),
  ('san-jose-vacant-lot', 'SB 9 Lot Split + Duplex', 'adu_expansion', 'Utilize SB 9 to split lot and build two duplexes (4 units total). Ministerial approval path.', 1800000, 2400000, 3200000, 4200000, 14, 18, 'medium'),
  ('san-jose-vacant-lot', 'Small Multifamily (6-8 units)', 'max_yield', 'Rezone or seek density bonus for small multifamily development. Requires entitlement process.', 3600000, 4800000, 5400000, 7200000, 18, 24, 'low');

-- SF scenarios (adaptive reuse of industrial building)
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('sf-adaptive-reuse', 'PDR-to-Office Conversion', 'conservative', 'Convert existing warehouse to creative office/maker space. Maintain PDR-compatible use. Shell-only improvements at $250-350/sf.', 2400000, 3360000, 4800000, 6400000, 12, 16, 'high'),
  ('sf-adaptive-reuse', 'Live-Work Conversion', 'adaptive_reuse', 'Convert to 8-12 live-work units under PDR-1-G allowances. Requires conditional use authorization from Planning Commission.', 4800000, 7200000, 9600000, 13200000, 18, 24, 'medium'),
  ('sf-adaptive-reuse', 'Full Residential (AB 2011)', 'max_yield', 'Utilize AB 2011 for ministerial residential conversion. 100% affordable or mixed-income with 15% affordable. 16-22 units.', 7200000, 10800000, 12800000, 17600000, 20, 30, 'medium');

-- Risks
INSERT INTO risks (property_id, category, title, description, severity, likelihood, mitigation, verification_owner)
VALUES
  ('oakland-adu-expansion', 'zoning', 'M-X zoning interpretation', 'Mixed-use zoning allows residential but specific density limits require confirmation with Oakland Planning.', 'medium', 'medium', 'Request pre-application meeting with Oakland Planning Department. Obtain written zoning determination letter.', 'Planning Consultant'),
  ('oakland-adu-expansion', 'construction', 'Lead/asbestos in 1948 structure', 'Pre-1978 building likely contains lead paint and possibly asbestos materials requiring abatement.', 'medium', 'high', 'Order Phase I environmental and hazmat survey before acquisition. Budget $15-30K for abatement.', 'Environmental Consultant'),
  ('oakland-adu-expansion', 'financial', 'Construction cost escalation', 'Bay Area construction costs trending 5-8% annually. Extended timelines increase exposure.', 'medium', 'medium', 'Lock contractor pricing early. Include 15-20% contingency. Consider design-build delivery.', 'General Contractor'),
  ('san-jose-vacant-lot', 'entitlement', 'R1-8 density limitations', 'Base zoning restricts to single-family. Higher density requires SB 9, density bonus, or rezoning.', 'high', 'medium', 'Confirm SB 9 eligibility with San Jose Planning. Evaluate density bonus applicability.', 'Land Use Attorney'),
  ('san-jose-vacant-lot', 'site', 'Unknown soil conditions', 'Vacant lot with no building history may have fill material or contamination from adjacent uses.', 'medium', 'medium', 'Order geotechnical report and Phase I ESA before purchase commitment. Budget $8-15K.', 'Geotechnical Engineer'),
  ('san-jose-vacant-lot', 'market', 'Interest rate sensitivity', 'Project economics depend on financing costs. Rate increases reduce feasibility of higher-density options.', 'medium', 'medium', 'Model scenarios at current rate +1-2%. Evaluate construction loan lock options.', 'Mortgage Broker'),
  ('sf-adaptive-reuse', 'entitlement', 'PDR-1-G use restrictions', 'PDR zoning protects industrial uses. Residential conversion requires AB 2011 pathway or conditional use.', 'high', 'medium', 'Engage SF Planning for pre-application conference. Confirm AB 2011 eligibility criteria.', 'Land Use Attorney'),
  ('sf-adaptive-reuse', 'construction', 'Seismic retrofit requirements', '1955 unreinforced masonry or concrete structure likely requires significant seismic upgrade for residential occupancy.', 'high', 'high', 'Commission structural engineering assessment. Budget $40-80/sf for seismic retrofit.', 'Structural Engineer'),
  ('sf-adaptive-reuse', 'financial', 'High conversion cost per unit', 'SF construction costs ($600-900/sf for residential) may challenge project economics without density bonus or tax credits.', 'high', 'medium', 'Evaluate LIHTC eligibility, local housing trust fund, and density bonus to reduce effective cost.', 'Financial Advisor');

-- Data sources
INSERT INTO data_sources (property_id, adapter_name, confidence, fetched_at)
VALUES
  ('oakland-adu-expansion', 'Alameda County Assessor', 'medium', '2024-06-01T10:00:00Z'),
  ('oakland-adu-expansion', 'Oakland Planning & Zoning', 'medium', '2024-06-01T10:00:00Z'),
  ('san-jose-vacant-lot', 'Santa Clara County Assessor', 'medium', '2024-06-01T10:00:00Z'),
  ('san-jose-vacant-lot', 'San Jose GIS Open Data', 'medium', '2024-06-01T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF Assessor - Secured Property Tax Rolls', 'medium', '2024-06-01T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF Planning - Zoning Districts', 'medium', '2024-06-01T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF DBI Permit History', 'low', '2024-06-01T10:00:00Z');

