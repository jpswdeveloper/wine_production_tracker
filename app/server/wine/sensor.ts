import { db } from "@/app/utils/prisma";
import { Sensor, Wine } from "@prisma/client";

export const getAllSensor = async ({
  search,
  pageIndex,
  perPage
}: {
  search?: string;
  pageIndex?: number;
  perPage?: number;
}): Promise<{ sensor: Sensor[]; count: number }> => {
  try {
    const limit = Number(perPage) || 5;
    const offset = Number(pageIndex) - 1 || 0;
    const skip = limit * offset;

    const sensors = await db.sensor.findMany({
      ...(search && {
        where: {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } }
          ]
        }
      }),
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc"
      }
    });
    const count = await db.sensor.count();
    return {
      sensor: sensors,
      count
    };
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to fetch sensors");
  }
};
