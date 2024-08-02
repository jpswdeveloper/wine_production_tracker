import zod from "zod";

export type WineT = {
  name: string;
  description: string;
  type: string;
  userId?: string;
};
export const CreateWineSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().min(1),
  type: zod.string().min(1),
  userId: zod.string().optional()
});

export const UpdateWineSchema = CreateWineSchema.optional();
