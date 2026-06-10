-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Properties table
create table properties (
  id text primary key,
  address text not null,
  city text not null,
  state text not null default 'CA',
  zip text,
  parcel_number text,
  zoning text,
  lot_size_sqft integer,
  current_use text,
  year_built integer,
  data_quality text check (data_quality in ('high', 'medium', 'low')) default 'low',
  raw_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Scenarios table
create table scenarios (
  id uuid primary key default uuid_generate_v4(),
  property_id text references properties(id) on delete cascade,
  title text not null,
  type text not null,
  description text,
  cost_low bigint,
  cost_high bigint,
  revenue_low bigint,
  revenue_high bigint,
  timeline_months_min integer,
  timeline_months_max integer,
  feasibility text check (feasibility in ('high', 'medium', 'low', 'unknown')),
  assumptions jsonb default '[]',
  created_at timestamptz default now()
);

-- Risks table
create table risks (
  id uuid primary key default uuid_generate_v4(),
  property_id text references properties(id) on delete cascade,
  scenario_id uuid references scenarios(id) on delete cascade,
  category text not null,
  title text not null,
  description text,
  severity text check (severity in ('critical', 'high', 'medium', 'low')),
  likelihood text check (likelihood in ('high', 'medium', 'low')),
  mitigation text,
  verification_owner text,
  created_at timestamptz default now()
);

-- Data sources / confidence tracking table
create table data_sources (
  id uuid primary key default uuid_generate_v4(),
  property_id text references properties(id) on delete cascade,
  adapter_name text not null,
  confidence text check (confidence in ('high', 'medium', 'low')),
  fetched_at timestamptz,
  raw_response jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table properties enable row level security;
alter table scenarios enable row level security;
alter table risks enable row level security;
alter table data_sources enable row level security;

-- Allow anonymous reads on properties (public data, no PII)
create policy "Public read access" on properties
  for select using (true);

create policy "Public read access" on scenarios
  for select using (true);

create policy "Public read access" on risks
  for select using (true);

create policy "Public read access" on data_sources
  for select using (true);

-- Write policies restricted to service_role
create policy "Service role write" on properties
  for all using (auth.role() = 'service_role');

create policy "Service role write" on scenarios
  for all using (auth.role() = 'service_role');

create policy "Service role write" on risks
  for all using (auth.role() = 'service_role');

create policy "Service role write" on data_sources
  for all using (auth.role() = 'service_role');

