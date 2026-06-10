import { createServerClient } from "./supabase";
import { propertyRecordSchema, type PropertyRecord } from "@/lib/schemas/property";

/**
 * Returns true when Supabase is configured.
 * When false, the app cannot serve real data and should surface
 * a configuration error rather than returning stale fixtures.
 */
function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!(process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

interface DbPropertyRow {
  id: string;
  address: string;
  city: string;
  state: string;
  zip?: string | null;
  parcel_number?: string | null;
  zoning?: string | null;
  lot_size_sqft?: number | null;
  current_use?: string | null;
  year_built?: number | null;
  data_quality?: string | null;
  scenarios?: DbScenarioRow[];
  risks?: DbRiskRow[];
  data_sources?: DbDataSourceRow[];
}

interface DbScenarioRow {
  id: string;
  title: string;
  type: string;
  description?: string | null;
  cost_low?: number | null;
  cost_high?: number | null;
  revenue_low?: number | null;
  revenue_high?: number | null;
  timeline_months_min?: number | null;
  timeline_months_max?: number | null;
  feasibility?: string | null;
}

interface DbRiskRow {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  severity?: string | null;
  likelihood?: string | null;
  mitigation?: string | null;
  verification_owner?: string | null;
}

interface DbDataSourceRow {
  id: string;
  adapter_name: string;
  confidence?: string | null;
  fetched_at?: string | null;
}

function mapRowToPropertyRecord(row: unknown): PropertyRecord {
  const data = row as DbPropertyRow;
  const sources = (data.data_sources ?? []).map((ds) => ({
    id: ds.id,
    sourceName: ds.adapter_name,
    sourceType: "assessor" as const,
    title: `Data from ${ds.adapter_name}`,
    retrievedAt: ds.fetched_at ?? new Date().toISOString(),
    confidence: (ds.confidence === "high" || ds.confidence === "medium" ? ds.confidence : "low") as
      | "high"
      | "medium"
      | "low",
  }));

  const rawQuality = data.data_quality;
  const dataQuality: "high" | "medium" | "low" =
    rawQuality === "high" || rawQuality === "medium" ? rawQuality : "low";

  const record = {
    id: data.id,
    address: data.address,
    city: data.city,
    state: data.state,
    parcelNumber: data.parcel_number ?? undefined,
    zoning: data.zoning ?? undefined,
    lotSizeSqFt: data.lot_size_sqft ?? undefined,
    currentUse: data.current_use ?? undefined,
    yearBuilt: data.year_built ?? undefined,
    sourceRecords: sources,
    dataQuality,
  };

  const parsed = propertyRecordSchema.safeParse(record);
  if (parsed.success) return parsed.data;
  return record as PropertyRecord;
}

export async function getAllPropertyIds(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const db = createServerClient();
  const { data, error } = await db.from("properties").select("id");
  if (error) throw new Error(`[DB] getAllPropertyIds: ${error.message}`);
  return (data ?? []).map((r) => r.id);
}

export async function getPropertyById(id: string): Promise<PropertyRecord | null> {
  if (!isSupabaseConfigured()) return null;
  const db = createServerClient();
  const { data, error } = await db
    .from("properties")
    .select("*, scenarios(*), risks(*), data_sources(*)")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`[DB] getPropertyById(${id}): ${error.message}`);
  }
  return mapRowToPropertyRecord(data);
}

export async function searchProperties(query: string): Promise<PropertyRecord[]> {
  if (!isSupabaseConfigured()) return [];
  const db = createServerClient();
  const { data, error } = await db
    .from("properties")
    .select("id, address, city, state, zip, zoning, current_use, data_quality")
    .or(`address.ilike.%${query}%,city.ilike.%${query}%`)
    .limit(20);
  if (error) throw new Error(`[DB] searchProperties: ${error.message}`);
  return (data ?? []).map(mapRowToPropertyRecord);
}

