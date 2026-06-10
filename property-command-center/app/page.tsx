"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PropertyCard } from "@/components/dashboard/property-card";
import { getAllMockProperties } from "@/lib/data/mock-properties";

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const properties = getAllMockProperties();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const match = properties.find(
      (p) =>
        p.property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.property.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      router.push(`/properties/${match.property.id}`);
    } else {
      router.push(`/properties/${properties[0].property.id}`);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Hero Section */}
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
          <br />
          <span className="text-ivory-500">Intelligence for property decisions.</span>
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8">
          <div className="flex gap-2">
            <Input
              className="h-12 text-base"
              placeholder="Enter an address or parcel (e.g., 4217 MLK Jr Way, Oakland)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button size="lg" onClick={handleSearch}>
              Analyze Property
            </Button>
          </div>
          <p className="text-[11px] text-ivory-600 mt-2">
            Try: Oakland, San Jose, or San Francisco addresses
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <MetricCard
          title="Properties Analyzed"
          value={properties.length}
          subtitle="Bay Area properties"
          icon={<svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="currentColor" /></svg>}
        />
        <MetricCard
          title="Scenarios Generated"
          value={properties.reduce((sum, p) => sum + p.scenarios.length, 0)}
          subtitle="Development options"
          icon={<svg width="20" height="20" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" /><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" /><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" /><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" /></svg>}
        />
        <MetricCard
          title="Average Confidence"
          value="Medium"
          subtitle="Across all sources"
          trend="neutral"
          icon={<svg width="20" height="20" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" /><path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
        />
        <MetricCard
          title="Potential Units"
          value={properties.reduce((sum, p) => sum + Math.max(...p.scenarios.map((s) => s.estimatedUnits.max)), 0)}
          subtitle="Across all scenarios"
          trend="up"
          icon={<svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 13L3 7L8 3L13 7L13 13" stroke="currentColor" strokeWidth="2" /><rect x="6" y="9" width="4" height="4" fill="currentColor" /></svg>}
        />
      </div>

      {/* Properties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ivory-200">Recent Properties</h2>
          <span className="text-xs text-ivory-500">{properties.length} properties</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <PropertyCard key={p.property.id} property={p} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="mt-10 bg-gradient-to-r from-copper-600/5 to-copper-700/5 border-copper-600/20">
        <CardContent className="p-8 text-center space-y-3">
          <h3 className="text-lg font-semibold text-ivory-100">Ready to analyze a property?</h3>
          <p className="text-sm text-ivory-400 max-w-lg mx-auto">
            Enter any Bay Area address above to generate a comprehensive Property Opportunity Brief
            with scenarios, risks, and recommendations.
          </p>
          <Button size="lg" className="mt-4" onClick={() => document.querySelector("input")?.focus()}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
