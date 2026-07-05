"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Scenario } from "@/lib/schemas/scenario";

interface ParcelVisualizationProps {
  scenarios: Scenario[];
  activeScenarioId: string;
  onScenarioChange: (id: string) => void;
}

export function ParcelVisualization({
  scenarios,
  activeScenarioId,
  onScenarioChange,
}: ParcelVisualizationProps) {
  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
  const config = activeScenario?.massingConfig;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ivory-300">3D Parcel Massing</h3>
        <div className="flex gap-1" role="tablist" aria-label="Scenario selector">
          {scenarios.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activeScenarioId}
              aria-label={`View massing for ${s.name}`}
              data-testid="scenario-tab"
              onClick={() => onScenarioChange(s.id)}
              className={cn(
                "px-2 py-1 text-[10px] rounded-md transition-all",
                s.id === activeScenarioId
                  ? "bg-copper-600/20 text-copper-300 border border-copper-600/40"
                  : "text-ivory-500 hover:text-ivory-300 border border-transparent"
              )}
            >
              {s.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Isometric Parcel Visualization */}
      <div
        data-testid="massing-3d"
        role="tabpanel"
        className="relative w-full h-[320px] bg-graphite-800/50 rounded-xl border border-graphite-700/50 overflow-hidden"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Isometric scene container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{
              transform: "rotateX(55deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Parcel base / ground plane */}
            <div
              className="absolute rounded-sm shadow-2xl transition-all duration-500"
              style={{
                width: "200px",
                height: "200px",
                background: "linear-gradient(135deg, #2a3a2a 0%, #1a2a1a 100%)",
                border: "1px solid rgba(100, 150, 100, 0.3)",
                left: "-100px",
                top: "-100px",
              }}
            >
              {/* Parcel label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[8px] text-green-400/50 font-mono"
                  style={{ transform: "rotateZ(45deg) rotateX(-55deg)" }}
                >
                  PARCEL
                </span>
              </div>
            </div>

            {/* Main building */}
            {config && (
              <IsometricBuilding
                config={config.mainBuilding}
                label="Main"
                offsetX={-20}
                offsetY={-20}
              />
            )}

            {/* ADU */}
            {config?.adu && (
              <IsometricBuilding config={config.adu} label="ADU" offsetX={50} offsetY={50} />
            )}

            {/* Additional structures */}
            {config?.additionalStructures?.map((struct, i) => (
              <IsometricBuilding
                key={i}
                config={struct}
                label={struct.label}
                offsetX={-50 + i * 60}
                offsetY={60}
              />
            ))}

            {/* Green space */}
            {config?.greenSpace && (
              <div
                className="absolute rounded-sm transition-all duration-500"
                style={{
                  width: "60px",
                  height: "40px",
                  background: "linear-gradient(135deg, #2d5a2d 0%, #1a4a1a 100%)",
                  border: "1px solid rgba(100, 200, 100, 0.2)",
                  left: "40px",
                  top: "-70px",
                }}
              />
            )}

            {/* Parking strip */}
            {config?.parking && (
              <div
                className="absolute rounded-sm transition-all duration-500"
                style={{
                  width: "180px",
                  height: "20px",
                  background: "linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)",
                  border: "1px solid rgba(150, 150, 150, 0.2)",
                  left: "-90px",
                  top: "80px",
                }}
              />
            )}

            {/* Community area */}
            {config?.communityArea && (
              <div
                className="absolute rounded-sm transition-all duration-500"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #4a3a2a 0%, #3a2a1a 100%)",
                  border: "1px solid rgba(200, 150, 100, 0.2)",
                  left: "60px",
                  top: "-30px",
                }}
              />
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          <LegendItem color="#6B5B4F" label="Building" />
          {config?.adu && <LegendItem color="#A0926B" label="ADU" />}
          {config?.greenSpace && <LegendItem color="#2d5a2d" label="Green" />}
          {config?.parking && <LegendItem color="#3a3a3a" label="Parking" />}
          {config?.communityArea && <LegendItem color="#4a3a2a" label="Community" />}
        </div>

        {/* Scenario label */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-graphite-900/80 border border-graphite-700/50">
          <p className="text-[10px] text-copper-300 font-medium">{activeScenario?.name}</p>
        </div>
      </div>
    </div>
  );
}

interface IsometricBuildingProps {
  config: { width: number; depth: number; height: number; color: string };
  label: string;
  offsetX: number;
  offsetY: number;
}

function IsometricBuilding({ config, label, offsetX, offsetY }: IsometricBuildingProps) {
  const scale = 1.5;
  const w = config.width * scale;
  const d = config.depth * scale;
  const h = config.height * scale;

  return (
    <div
      className="absolute transition-all duration-700 group/building"
      style={{
        left: `${offsetX}px`,
        top: `${offsetY}px`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top face */}
      <div
        className="absolute transition-all duration-500 group-hover/building:brightness-110"
        style={{
          width: `${w}px`,
          height: `${d}px`,
          background: config.color,
          transform: `translateZ(${h}px)`,
          opacity: 0.9,
          borderRadius: "2px",
          boxShadow: `0 0 20px ${config.color}33`,
        }}
      />
      {/* Front face */}
      <div
        className="absolute transition-all duration-500"
        style={{
          width: `${w}px`,
          height: `${h}px`,
          background: `linear-gradient(180deg, ${config.color} 0%, ${config.color}aa 100%)`,
          transform: `rotateX(-90deg) translateZ(${d}px)`,
          transformOrigin: "bottom",
          borderRadius: "2px",
        }}
      />
      {/* Side face */}
      <div
        className="absolute transition-all duration-500"
        style={{
          width: `${d}px`,
          height: `${h}px`,
          background: `linear-gradient(180deg, ${config.color}dd 0%, ${config.color}88 100%)`,
          transform: `rotateY(90deg) rotateX(-90deg) translateZ(${w}px)`,
          transformOrigin: "bottom",
          borderRadius: "2px",
        }}
      />
      {/* Label */}
      <div
        className="absolute text-[7px] text-ivory-400/70 font-mono whitespace-nowrap"
        style={{
          transform: `rotateZ(45deg) rotateX(-55deg) translateZ(${h + 5}px)`,
          left: `${w / 4}px`,
          top: `${d / 4}px`,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-[9px] text-ivory-500">{label}</span>
    </div>
  );
}
