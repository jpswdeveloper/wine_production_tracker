import zod from "zod";

export type WineT = {
  name: string;
  description: string;
  type: string;
  userId?: string;
};
export const CreateWineSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  type: zod.string(),
  userId: zod.string().optional()
});

export const UpdateWineSchema = CreateWineSchema.optional();
