import { NextRequest, NextResponse } from "next/server";
import { getAdaptersForCity } from "@/lib/data/data-sources";
import { normalizeAdapterResults } from "@/lib/public-data/normalize";
import { getMockPropertyById } from "@/lib/data/mock-properties";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "CA";

  if (!address && !city) {
    return NextResponse.json(
      { error: "Address or city parameter required" },
      { status: 400 }
    );
  }

  try {
    // Get appropriate adapters for the city
    const adapters = getAdaptersForCity(city);

    // Run all adapters in parallel
    const results = await Promise.allSettled(
      adapters.map((adapter) => adapter.fetch(address, city))
    );

    // Extract successful results
    const adapterResults = results
      .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof adapters[0]["fetch"]>>> => r.status === "fulfilled")
      .map((r) => r.value);

    // Normalize results into a single property record
    const normalizedProperty = await normalizeAdapterResults(address, city, state, adapterResults);

    return NextResponse.json({
      property: normalizedProperty,
      adaptersUsed: adapters.map((a) => a.name),
      totalSources: normalizedProperty.sourceRecords.length,
      dataQuality: normalizedProperty.dataQuality,
    });
  } catch (error) {
    // If real data fetch fails entirely, try to match with mock data
    const mockId = address.toLowerCase().replace(/[^a-z0-9]/g, "-").substring(0, 20);
    const mockProperty = getMockPropertyById(mockId);

    if (mockProperty) {
      return NextResponse.json({
        property: mockProperty.property,
        adaptersUsed: ["fallback"],
        totalSources: mockProperty.property.sourceRecords.length,
        dataQuality: "fallback",
        note: "Real data adapters failed. Using fallback data.",
      });
    }

    return NextResponse.json({
      error: "Failed to fetch property data",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
