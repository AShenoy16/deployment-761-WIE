import { z } from "zod";

export const rankingWeightingsFormSchema = z.object({
  specName: z.string().min(1, "Spec Name is required"),
  ranks: z.record(z.number().min(0, "Rank value must be non-negative")),
});
