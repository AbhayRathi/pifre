import { z } from "zod";
import { confidenceSchema } from "./source";

export const scenarioTypeSchema = z.enum([
  "conservative",
  "adu_expansion",
  "max_yield",
  "affordable_sustainable",
  "adaptive_reuse",
]);

export const riskLevelSchema = z.enum(["low", "medium", "high", "very_high"]);

export const massingConfigSchema = z.object({
  mainBuilding: z.object({
    width: z.number(),
    depth: z.number(),
    height: z.number(),
    color: z.string(),
  }),
  adu: z
    .object({
      width: z.number(),
      depth: z.number(),
      height: z.number(),
      color: z.string(),
    })
    .optional(),
  additionalStructures: z
    .array(
      z.object({
        width: z.number(),
        depth: z.number(),
        height: z.number(),
        color: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  parking: z.boolean().optional(),
  greenSpace: z.boolean().optional(),
  communityArea: z.boolean().optional(),
});

export const scenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: scenarioTypeSchema,
  description: z.string(),
  estimatedUnits: z.object({ min: z.number(), max: z.number() }),
  estimatedCost: z.object({ min: z.number(), max: z.number() }),
  estimatedValue: z.object({ min: z.number(), max: z.number() }),
  timeline: z.string(),
  riskLevel: riskLevelSchema,
  confidence: confidenceSchema,
  recommendation: z.string(),
  massingConfig: massingConfigSchema,
});

export type ScenarioType = z.infer<typeof scenarioTypeSchema>;
export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type MassingConfig = z.infer<typeof massingConfigSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
