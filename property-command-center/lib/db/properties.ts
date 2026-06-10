import { PropertyRecord } from "@/lib/schemas/property";
import { getMockPropertyById, getAllMockProperties } from "@/lib/data/mock-properties";

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getPropertyById(id: string): Promise<PropertyRecord | null> {
  if (useSupabase) {
    const { createServerClient } = await import("./supabase");
    const client = createServerClient();
    const { data } = await client.from("properties").select("*").eq("id", id).single();
    if (!data) return null;
    return {
      id: data.id,
      address: data.address,
      city: data.city,
      state: data.state,
      parcelNumber: data.parcel_number ?? undefined,
      zoning: data.zoning ?? undefined,
      lotSizeSqFt: data.lot_size_sqft ?? undefined,
      currentUse: data.current_use ?? undefined,
      yearBuilt: data.year_built ?? undefined,
      sourceRecords: [],
      dataQuality: "partial",
    };
  }

  const mock = getMockPropertyById(id);
  return mock?.property ?? null;
}

export async function searchProperties(query: string): Promise<PropertyRecord[]> {
  if (useSupabase) {
    const { createServerClient } = await import("./supabase");
    const client = createServerClient();
    const { data } = await client
      .from("properties")
      .select("*")
      .or(`address.ilike.%${query}%,city.ilike.%${query}%`)
      .limit(20);
    if (!data) return [];
    return data.map((row) => ({
      id: row.id,
      address: row.address,
      city: row.city,
      state: row.state,
      parcelNumber: row.parcel_number ?? undefined,
      zoning: row.zoning ?? undefined,
      lotSizeSqFt: row.lot_size_sqft ?? undefined,
      currentUse: row.current_use ?? undefined,
      yearBuilt: row.year_built ?? undefined,
      sourceRecords: [],
      dataQuality: "partial",
    }));
  }

  const all = getAllMockProperties();
  const lower = query.toLowerCase();
  return all
    .filter(
      (p) =>
        p.property.address.toLowerCase().includes(lower) ||
        p.property.city.toLowerCase().includes(lower)
    )
    .map((p) => p.property);
}

export async function getAllPropertyIds(): Promise<string[]> {
  if (useSupabase) {
    const { createServerClient } = await import("./supabase");
    const client = createServerClient();
    const { data } = await client.from("properties").select("id");
    return data?.map((row) => row.id) ?? [];
  }

  return getAllMockProperties().map((p) => p.property.id);
}
