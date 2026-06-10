import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PropertyCard } from "@/components/dashboard/property-card";
import { PropertySearchInput } from "@/components/property-search-input";
import { getAllProperties } from "@/lib/db/properties";

export default async function DashboardPage() {
  const properties = await getAllProperties();

  const propertyIds = properties.map((p) => ({
    id: p.id,
    address: p.address,
    city: p.city,
  }));

  const totalSources = properties.reduce((sum, p) => sum + p.sourceRecords.length, 0);
  const highConfSources = properties.reduce(
    (sum, p) => sum + p.sourceRecords.filter((s) => s.confidence === "high").length,
    0
  );
  const confidenceLabel =
    highConfSources > totalSources / 2 ? "High" : highConfSources > 0 ? "Medium" : "Low";

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper-600/10 border border-copper-600/20 text-copper-300 text-xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-pulse" />
          Development Intelligence Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-ivory-100 tracking-tight">
          Property Command Center
        </h1>
        <p className="text-lg text-ivory-400 max-w-2xl mx-auto">
          Should you buy, build, convert, redesign, negotiate, or walk away?
        </p>
        <PropertySearchInput propertyIds={propertyIds} />
      </div>

      {properties.length === 0 ? (
        <Card className="border-copper-600/30 bg-copper-600/5">
          <CardContent className="p-10 text-center space-y-4">
            <div className="text-4xl">🏗️</div>
            <h2 className="text-xl font-semibold text-ivory-100">Database not yet connected</h2>
            <p className="text-sm text-ivory-400 max-w-lg mx-auto">
              Connect your Supabase project and run the seed data to get started.
            </p>
            <div className="text-left inline-block bg-graphite-800 rounded-lg px-6 py-4 text-xs text-ivory-300 font-mono space-y-1">
              <p className="text-ivory-500"># 1. Copy and fill your environment variables</p>
              <p>cp .env.example .env.local</p>
              <p className="text-ivory-500 mt-2"># 2. Run schema and seed in Supabase SQL editor</p>
              <p>supabase/schema.sql → supabase/seed.sql</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MetricCard title="Properties" value={properties.length} subtitle="In database" />
            <MetricCard title="Data Sources" value={totalSources} subtitle="Across all properties" />
            <MetricCard title="Avg Confidence" value={confidenceLabel} subtitle={`${highConfSources} verified`} />
            <MetricCard title="Cities" value={new Set(properties.map((p) => p.city)).size} subtitle="Markets covered" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
