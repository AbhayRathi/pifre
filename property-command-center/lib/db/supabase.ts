import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

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
          data_quality: string | null;
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
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Add them to .env.local — see .env.example for reference."
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

