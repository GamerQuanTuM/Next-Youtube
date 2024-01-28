import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const response = 1;

  const create = await prismadb.user.create({
    data: {
      clerk_id: "1",
    },
  });
  return NextResponse.json({ message: create }, { status: 200 });
}
