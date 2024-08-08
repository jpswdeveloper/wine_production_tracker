import { db } from "@/app/utils/prisma";

export const getAllStageWine = async ({
  search,
  pageIndex,
  perPage
}: {
  search?: string;
  pageIndex?: number;
  perPage?: number;
}): Promise<{ stages: {}[]; count: number }> => {
  try {
    const limit = Number(perPage) || 5;
    const offset = Number(pageIndex) - 1 || 0;
    const skip = limit * offset;
    console.log("limit", limit, "offset", offset, "skip", skip);

    const stages = await db.productionStage.findMany({
      ...(search && {
        where: {
          OR: [
            { stage: { contains: search } },
            { status: { contains: search } }
          ]
        }
      }),
      include: { wine: true },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc"
      }
    });
    const count = await db.productionStage.count();
    return {
      stages,
      count
    };
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to fetch products");
  }
};
