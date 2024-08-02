import { db } from "@/app/utils/prisma";
import { Prisma } from "@prisma/client";

export const createWineDA = async (
  data: Prisma.WineCreateInput
): Promise<{ message: string; status: number }> => {
  await db.wine.create({ data });
  return { message: "Wine created successfully", status: 200 };
};
