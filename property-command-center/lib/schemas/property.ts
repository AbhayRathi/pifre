import { z } from "zod";
import { sourceRecordSchema } from "./source";

export const dataQualitySchema = z.enum(["high", "medium", "low", "real", "partial", "fallback"]);

export const propertyRecordSchema = z.object({
  id: z.string(),
  address: z.string(),
  city: z.string(),
  county: z.string().optional(),
  state: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  parcelNumber: z.string().optional(),
  lotSizeSqFt: z.number().optional(),
  buildingSizeSqFt: z.number().optional(),
  currentUse: z.string().optional(),
  zoning: z.string().optional(),
  yearBuilt: z.number().optional(),
  sourceRecords: z.array(sourceRecordSchema),
  dataQuality: dataQualitySchema.default("low"),
});

export type DataQuality = z.infer<typeof dataQualitySchema>;
export type PropertyRecord = z.infer<typeof propertyRecordSchema>;

