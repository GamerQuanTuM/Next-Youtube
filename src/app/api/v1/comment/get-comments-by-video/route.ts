import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { videoId } = await req.json();

  console.log(videoId)

  try {
    const comments = await prismadb.comment.findMany({
      where: {
        videoId,
      },
      include: {
        user: {
          include: {
            Channel: true,
          },
        },
      },
    });
    return NextResponse.json({ message: comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
