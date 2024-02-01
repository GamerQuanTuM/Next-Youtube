import { NextResponse } from "next/server";
import { prismadb } from "@/utils/prismadb";
import { Video } from "@prisma/client";

export async function POST(req: Request) {
  const { categoryId } = await req.json();

  try {
    const suggestedVideos: Video[] = await prismadb.video.findMany({
      where: {
        categoryId,
      },
    });

    return NextResponse.json({ message: suggestedVideos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
