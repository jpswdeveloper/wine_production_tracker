import { getAllWine } from "@/app/server/wine/getall";
import { db } from "@/app/utils/prisma";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageIndex = searchParams.get("pageIndex");
    const perPage = searchParams.get("pageSize");
    const search = searchParams.get("search");

    const getAllData = await getAllWine({
      pageIndex: Number(Number(pageIndex) == 0 ? 1 : pageIndex || 0),
      perPage: Number(perPage || 5),
      ...(search && { search: search })
    });

    return Response.json(getAllData, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
