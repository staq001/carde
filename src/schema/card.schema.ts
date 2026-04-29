import zod from "zod";

export const createCardSchema = zod.object({
  name: zod.string().min(2).max(100),
  description: zod.string().max(255).optional(),
});

export const verifyCardSchema = zod.object({
  id: zod.string(),
});
