import { createClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          address: string;
          city: string;
          state: string;
          zip: string | null;
          parcel_number: string | null;
          zoning: string | null;
          lot_size_sqft: number | null;
          current_use: string | null;
          year_built: number | null;
          raw_data: unknown | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["properties"]["Row"],
          "created_at" | "updated_at"
        >;
      };
      scenarios: {
        Row: {
          id: string;
          property_id: string;
          title: string;
          type: string;
          description: string | null;
          cost_low: number | null;
          cost_high: number | null;
          revenue_low: number | null;
          revenue_high: number | null;
          timeline_months_min: number | null;
          timeline_months_max: number | null;
          feasibility: string | null;
          assumptions: unknown | null;
          created_at: string;
        };
      };
      risks: {
        Row: {
          id: string;
          property_id: string;
          scenario_id: string | null;
          category: string;
          title: string;
          description: string | null;
          severity: string | null;
          likelihood: string | null;
          mitigation: string | null;
          verification_owner: string | null;
          created_at: string;
        };
      };
      data_sources: {
        Row: {
          id: string;
          property_id: string;
          adapter_name: string;
          confidence: string | null;
          fetched_at: string | null;
          raw_response: unknown | null;
          created_at: string;
        };
      };
    };
  };
};

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env"
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
}

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env"
    );
  }

  return createClient<Database>(url, anonKey);
}
