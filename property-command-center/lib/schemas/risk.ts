import { z } from "zod";

export const riskCategorySchema = z.enum([
  "zoning",
  "permitting",
  "construction",
  "financing",
  "market",
  "environmental",
  "data_confidence",
  "community_political",
  "legal_professional",
]);

export const severitySchema = z.enum(["low", "medium", "high", "critical"]);
export const likelihoodSchema = z.enum(["unlikely", "possible", "likely", "very_likely"]);

export const riskSchema = z.object({
  id: z.string(),
  category: riskCategorySchema,
  severity: severitySchema,
  likelihood: likelihoodSchema,
  summary: z.string(),
  mitigation: z.string(),
  verifiedBy: z.string(),
});

export type RiskCategory = z.infer<typeof riskCategorySchema>;
export type Severity = z.infer<typeof severitySchema>;
export type Likelihood = z.infer<typeof likelihoodSchema>;
export type Risk = z.infer<typeof riskSchema>;
