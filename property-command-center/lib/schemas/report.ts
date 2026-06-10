import { z } from "zod";

export const reportSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  order: z.number(),
});

export const reportSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  title: z.string(),
  generatedAt: z.string(),
  sections: z.array(reportSectionSchema),
  disclaimer: z.string(),
});

export type ReportSection = z.infer<typeof reportSectionSchema>;
export type Report = z.infer<typeof reportSchema>;
