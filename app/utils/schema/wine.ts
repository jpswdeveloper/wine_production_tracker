import zod from "zod";

export type WineT = {
  name: string;
  description: string;
  type: string;
  userId?: string;
};
export type WineStageT = {
  description?: string;
  stage: string;
  wineId?: string;
  wineName?: string;
};
export const CreateWineSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().min(1),
  type: zod.string().min(1),
  userId: zod.string().optional(),
  wineName: zod.string()
});
export const CreateWineStageSchema = zod.object({
  description: zod.string().optional(),
  stage: zod.string().min(1),
  wineId: zod.string().optional()
});

export const UpdateWineSchema = CreateWineSchema.optional();

export type SensorT = {
  name: string;
  description: string;
};
export const createSensorSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().min(1)
});
