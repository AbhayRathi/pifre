import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getAdaptersForCity } from "@/lib/data/data-sources";
import { normalizeAdapterResults } from "@/lib/public-data/normalize";

const requestSchema = z.object({
  address: z.string().trim().min(3).max(200),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(2).default("CA"),
  propertyId: z.string().trim().min(1).max(60).optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = {
    address: searchParams.get("address") ?? "",
    city: searchParams.get("city") ?? "",
    state: searchParams.get("state") ?? "CA",
    propertyId: searchParams.get("propertyId") ?? undefined,
  };

  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { address, city, state } = parsed.data;

  try {
    const adapters = getAdaptersForCity(city);

    const results = await Promise.allSettled(
      adapters.map((adapter) => adapter.fetch(address, city))
    );

    const adapterResults = results
      .filter(
        (r): r is PromiseFulfilledResult<Awaited<ReturnType<(typeof adapters)[0]["fetch"]>>> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value);

    const normalizedProperty = await normalizeAdapterResults(address, city, state, adapterResults);

    return NextResponse.json({
      property: normalizedProperty,
      adaptersUsed: adapters.map((a) => a.name),
      totalSources: normalizedProperty.sourceRecords.length,
      dataQuality: normalizedProperty.dataQuality,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch property data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

