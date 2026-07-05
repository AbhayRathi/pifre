import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "parcel",
  "zoning",
  "permit",
  "assessor",
  "gis",
  "market",
  "user_upload",
  "manual",
  "fallback",
]);

export const confidenceSchema = z.enum(["low", "medium", "high"]);

export const sourceRecordSchema = z.object({
  id: z.string(),
  sourceName: z.string(),
  sourceType: sourceTypeSchema,
  title: z.string(),
  url: z.string().optional(),
  retrievedAt: z.string(),
  confidence: confidenceSchema,
  notes: z.string().optional(),
});

export type SourceType = z.infer<typeof sourceTypeSchema>;
export type Confidence = z.infer<typeof confidenceSchema>;
export type SourceRecord = z.infer<typeof sourceRecordSchema>;
