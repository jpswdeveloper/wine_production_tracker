import { db } from "@/app/utils/prisma";

export async function GET() {
  try {
    await db.user.deleteMany({
      where: { email: "teste@exemplo.us" }
    });
    return Response.json({
      message: "Data deleted successfully"
      //   data: deleteUser
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
