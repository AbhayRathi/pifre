-- Seed data: 3 Bay Area demo properties from mock-properties.ts

INSERT INTO properties (id, address, city, state, parcel_number, zoning, lot_size_sqft, current_use, year_built)
VALUES
  ('oakland-adu-expansion', '4217 Martin Luther King Jr Way', 'Oakland', 'CA', '012-0987-001', 'RM-2 (Mixed Housing Type Residential)', 5200, 'Single Family Residential', 1923),
  ('san-jose-vacant-lot', '1850 Almaden Expressway', 'San Jose', 'CA', '434-12-089', 'R-M (Multiple Residence)', 12500, 'Vacant Land', NULL),
  ('sf-adaptive-reuse', '1455 Market Street', 'San Francisco', 'CA', '3507-005', 'NCT-3 (Neighborhood Commercial Transit)', 8400, 'Commercial Office (Vacant)', 1962);

-- Oakland scenarios
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('oakland-adu-expansion', 'Conservative Improvement', 'conservative', 'Renovate existing home, add permitted garage conversion.', 150000, 250000, 850000, 1050000, 6, 9, 'high'),
  ('oakland-adu-expansion', 'ADU + Junior ADU', 'adu_expansion', 'Add detached ADU (600sf) in rear yard plus JADU conversion.', 280000, 420000, 1200000, 1500000, 10, 14, 'high'),
  ('oakland-adu-expansion', 'Max Yield Multifamily', 'max_yield', 'Demolish and build 4-6 unit multifamily under RM-2 zoning.', 1200000, 1800000, 2200000, 3000000, 18, 24, 'medium'),
  ('oakland-adu-expansion', 'Affordable / Community Housing', 'affordable_sustainable', 'Partner with affordable housing developer.', 1800000, 2400000, 2000000, 2800000, 24, 36, 'medium');

-- San Jose scenarios
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('san-jose-vacant-lot', 'Townhome Development', 'conservative', 'Build 4-6 attached townhomes.', 2200000, 3200000, 4000000, 5500000, 18, 24, 'medium'),
  ('san-jose-vacant-lot', 'Small Multifamily (8-12 units)', 'max_yield', 'Maximize density under R-M zoning.', 4500000, 6500000, 7000000, 9500000, 24, 30, 'medium'),
  ('san-jose-vacant-lot', 'Mixed-Use with Retail', 'adaptive_reuse', 'Ground-floor retail with residential above.', 3800000, 5500000, 5500000, 8000000, 24, 36, 'low');

-- SF scenarios
INSERT INTO scenarios (property_id, title, type, description, cost_low, cost_high, revenue_low, revenue_high, timeline_months_min, timeline_months_max, feasibility)
VALUES
  ('sf-adaptive-reuse', 'Office-to-Residential Conversion', 'adaptive_reuse', 'Convert vacant office to 18-24 residential units.', 5500000, 8000000, 12000000, 16000000, 18, 24, 'medium'),
  ('sf-adaptive-reuse', 'Mixed-Use Residential + Ground Retail', 'max_yield', 'Full conversion with ground-floor retail.', 7000000, 10000000, 15000000, 20000000, 24, 30, 'medium'),
  ('sf-adaptive-reuse', 'Affordable Housing Conversion', 'affordable_sustainable', '100% affordable conversion utilizing AB 2011.', 6000000, 9000000, 8000000, 12000000, 24, 36, 'medium');

-- Data sources
INSERT INTO data_sources (property_id, adapter_name, confidence, fetched_at)
VALUES
  ('oakland-adu-expansion', 'Alameda County Assessor', 'fallback', '2024-01-15T10:00:00Z'),
  ('oakland-adu-expansion', 'Oakland Planning & Zoning', 'fallback', '2024-01-15T10:00:00Z'),
  ('san-jose-vacant-lot', 'San Jose GIS Open Data', 'fallback', '2024-01-15T10:00:00Z'),
  ('san-jose-vacant-lot', 'Santa Clara County Assessor', 'fallback', '2024-01-15T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF Assessor - Secured Property Tax Rolls', 'fallback', '2024-01-15T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF Planning - Zoning', 'fallback', '2024-01-15T10:00:00Z'),
  ('sf-adaptive-reuse', 'SF DBI Permit History', 'fallback', '2024-01-15T10:00:00Z');
