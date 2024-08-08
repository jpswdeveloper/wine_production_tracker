import { getAllStageWine } from "@/app/server/wine/stages/getall";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageIndex = searchParams.get("pageIndex");
    const perPage = searchParams.get("pageSize");
    const search = searchParams.get("search");

    const getAllData = await getAllStageWine({
      pageIndex: Number(Number(pageIndex) == 0 ? 1 : pageIndex || 0),
      perPage: Number(perPage || 5),
      ...(search && { search: search })
    });

    return Response.json(getAllData, { status: 200 });
  } catch (error) {
    throw new Error("Error fetching Wine Stages");
  }
}
