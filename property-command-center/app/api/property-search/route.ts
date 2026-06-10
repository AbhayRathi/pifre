import { NextRequest, NextResponse } from "next/server";
import { getAllMockProperties } from "@/lib/data/mock-properties";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const properties = getAllMockProperties();

  if (!query) {
    return NextResponse.json({
      results: properties.map((p) => ({
        id: p.property.id,
        address: p.property.address,
        city: p.property.city,
        state: p.property.state,
        currentUse: p.property.currentUse,
        zoning: p.property.zoning,
      })),
    });
  }

  const filtered = properties.filter(
    (p) =>
      p.property.address.toLowerCase().includes(query) ||
      p.property.city.toLowerCase().includes(query) ||
      p.property.currentUse?.toLowerCase().includes(query) ||
      p.property.zoning?.toLowerCase().includes(query)
  );

  return NextResponse.json({
    results: filtered.map((p) => ({
      id: p.property.id,
      address: p.property.address,
      city: p.property.city,
      state: p.property.state,
      currentUse: p.property.currentUse,
      zoning: p.property.zoning,
    })),
    query,
  });
}
