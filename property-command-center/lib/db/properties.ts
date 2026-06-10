import { createServerClient } from "./supabase";
import { propertyRecordSchema, type PropertyRecord } from "@/lib/schemas/property";
import type { Scenario } from "@/lib/schemas/scenario";
import type { Risk } from "@/lib/schemas/risk";

/**
 * The shape expected by PropertyWorkspace.
 * Mirrors MockProperty but is sourced from the database.
 */
export interface PropertyWorkspaceData {
  property: PropertyRecord;
  scenarios: Scenario[];
  risks: Risk[];
  assumptions: Record<string, number | string>;
}

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
  return (data as Array<{ id: string }> ?? []).map((r) => r.id);
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

export async function getAllProperties(): Promise<PropertyRecord[]> {
  if (!isSupabaseConfigured()) return [];
  const db = createServerClient();
  const { data, error } = await db
    .from("properties")
    .select("*, data_sources(*)")
    .order("address");
  if (error) throw new Error(`[DB] getAllProperties: ${error.message}`);
  return (data ?? []).map(mapRowToPropertyRecord);
}

function mapDbScenarioRow(row: DbScenarioRow): Scenario {
  const feasibility = row.feasibility ?? "low";
  const riskLevel =
    feasibility === "high" || feasibility === "medium" || feasibility === "low"
      ? (feasibility as "high" | "medium" | "low")
      : "low";

  return {
    id: row.id,
    name: row.title,
    type: "conservative" as const,
    description: row.description ?? "",
    estimatedUnits: { min: 0, max: 0 },
    estimatedCost: {
      min: row.cost_low ?? 0,
      max: row.cost_high ?? 0,
    },
    estimatedValue: {
      min: row.revenue_low ?? 0,
      max: row.revenue_high ?? 0,
    },
    timeline:
      row.timeline_months_min != null
        ? `${row.timeline_months_min}–${row.timeline_months_max ?? row.timeline_months_min} months`
        : "TBD",
    riskLevel,
    confidence: "low" as const,
    recommendation: "",
    massingConfig: {
      mainBuilding: { width: 40, depth: 30, height: 20, color: "#b87333" },
    },
  };
}

function mapDbRiskRow(row: DbRiskRow): Risk {
  const severity = ["low", "medium", "high", "critical"].includes(row.severity ?? "")
    ? (row.severity as "low" | "medium" | "high" | "critical")
    : "low";
  const likelihood = ["unlikely", "possible", "likely", "very_likely"].includes(
    row.likelihood ?? ""
  )
    ? (row.likelihood as "unlikely" | "possible" | "likely" | "very_likely")
    : "unlikely";
  const riskCategoryValues = [
    "zoning",
    "permitting",
    "construction",
    "financing",
    "market",
    "environmental",
    "data_confidence",
    "community_political",
    "legal_professional",
  ];
  const category = riskCategoryValues.includes(row.category)
    ? (row.category as Risk["category"])
    : "data_confidence";

  return {
    id: row.id,
    category,
    severity,
    likelihood,
    summary: row.title,
    mitigation: row.mitigation ?? "",
    verifiedBy: row.verification_owner ?? "Unassigned",
  };
}

export async function getPropertyWithScenariosAndRisks(
  id: string
): Promise<PropertyWorkspaceData | null> {
  if (!isSupabaseConfigured()) return null;

  const db = createServerClient();

  const [propResult, scenariosResult, risksResult] = await Promise.all([
    db
      .from("properties")
      .select("*, data_sources(*)")
      .eq("id", id)
      .single(),
    db.from("scenarios").select("*").eq("property_id", id),
    db.from("risks").select("*").eq("property_id", id),
  ]);

  if (propResult.error) {
    if (propResult.error.code === "PGRST116") return null;
    throw new Error(`[DB] getPropertyWithScenariosAndRisks(${id}): ${propResult.error.message}`);
  }

  const property = mapRowToPropertyRecord(propResult.data);
  const scenarios = (scenariosResult.data ?? []).map((r) => mapDbScenarioRow(r as DbScenarioRow));
  const risks = (risksResult.data ?? []).map((r) => mapDbRiskRow(r as DbRiskRow));

  return { property, scenarios, risks, assumptions: {} };
}

