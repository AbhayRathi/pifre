"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { PropertyHeader } from "./property-header";
import { ParcelVisualization } from "./parcel-visualization";
import { ScenarioCard } from "./scenario-card";
import { ScenarioComparison } from "./scenario-comparison";
import { AssumptionsPanel } from "./assumptions-panel";
import { RiskRegister } from "./risk-register";
import { AgentPanel } from "./agent-panel";
import { ReportPreview } from "./report-preview";
import { SourceList } from "./source-list";
import { MockProperty } from "@/lib/data/mock-properties";
import { buildReport } from "@/lib/reports/build-report";

interface PropertyWorkspaceProps {
  data: MockProperty;
}

export function PropertyWorkspace({ data }: PropertyWorkspaceProps) {
  const { property, scenarios, risks, assumptions } = data;
  const [activeSection, setActiveSection] = useState("overview");
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id || "");
  const [localAssumptions, setLocalAssumptions] = useState(assumptions);

  const report = useMemo(
    () => buildReport(property, scenarios, risks, localAssumptions),
    [property, scenarios, risks, localAssumptions]
  );

  const handleAssumptionUpdate = (key: string, value: number | string) => {
    setLocalAssumptions((prev) => ({ ...prev, [key]: value }));
  };

  const renderCenterContent = () => {
    switch (activeSection) {
      case "overview":
      case "site":
        return (
          <div className="space-y-6">
            <PropertyHeader property={property} />
            <ParcelVisualization
              scenarios={scenarios}
              activeScenarioId={activeScenarioId}
              onScenarioChange={setActiveScenarioId}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((s) => (
                <ScenarioCard
                  key={s.id}
                  scenario={s}
                  isActive={s.id === activeScenarioId}
                  onClick={() => setActiveScenarioId(s.id)}
                />
              ))}
            </div>
          </div>
        );
      case "scenarios":
        return (
          <div className="space-y-6">
            <ParcelVisualization
              scenarios={scenarios}
              activeScenarioId={activeScenarioId}
              onScenarioChange={setActiveScenarioId}
            />
            <ScenarioComparison scenarios={scenarios} activeScenarioId={activeScenarioId} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((s) => (
                <ScenarioCard
                  key={s.id}
                  scenario={s}
                  isActive={s.id === activeScenarioId}
                  onClick={() => setActiveScenarioId(s.id)}
                />
              ))}
            </div>
          </div>
        );
      case "assumptions":
        return (
          <div className="max-w-xl">
            <AssumptionsPanel assumptions={localAssumptions} onUpdate={handleAssumptionUpdate} />
          </div>
        );
      case "risks":
        return <RiskRegister risks={risks} />;
      case "report":
        return <ReportPreview report={report} />;
      case "sources":
        return <SourceList sources={property.sourceRecords} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Center Content */}
      <div className="flex-1 overflow-y-auto p-6">{renderCenterContent()}</div>

      {/* Right Intelligence Panel */}
      <div className="w-80 border-l border-graphite-700/50 bg-graphite-800/20 p-4 flex flex-col gap-4 overflow-y-auto">
        <AgentPanel
          propertyAddress={property.address}
          propertyId={property.id}
          propertyContext={{ scenarios, risks }}
        />
        <AssumptionsPanel assumptions={localAssumptions} onUpdate={handleAssumptionUpdate} />
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-wider text-ivory-500 font-medium">
            Suggested Next Actions
          </h4>
          <div className="space-y-1.5">
            {[
              "Verify zoning with Planning Dept",
              "Order title report",
              "Get Phase I ESA quote",
              "Pull comparable sales",
            ].map((action) => (
              <div
                key={action}
                className="flex items-center gap-2 text-xs text-ivory-400 p-1.5 rounded hover:bg-graphite-700/30"
              >
                <span className="text-copper-400">→</span>
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
