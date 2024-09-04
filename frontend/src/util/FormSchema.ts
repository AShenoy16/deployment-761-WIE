import { z } from "zod";

export const rankingWeightingsFormSchema = z.object({
  specName: z.string().min(1, "Spec Name is required"),
  weightings: z.record(
    z
      .number()
      .min(0, "Weighting value must be at least 0")
      .max(99, "Weighting value must be less than 100")
  ),
});
