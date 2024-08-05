import { db } from "@/app/utils/prisma";
import { Wine } from "@prisma/client";

export const getAllWine = async ({
  search,
  pageIndex,
  perPage
}: {
  search?: string;
  pageIndex?: number;
  perPage?: number;
}): Promise<{ wine: Wine[]; count: number }> => {
  try {
    const limit = Number(perPage) || 5;
    const offset = Number(pageIndex) - 1 || 0;
    const skip = limit * offset;
    console.log("limit", limit, "offset", offset, "skip", skip);

    const products = await db.wine.findMany({
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
    const count = await db.wine.count();
    return {
      wine: products,
      count
    };
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to fetch products");
  }
};
