import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body)

  const { title, description, tags, video_url, userId, categoryId } = body;

  try {
    const video = await prismadb.video.create({
      data: {
        title,
        description,
        tags,
        video_url,
        likes: [],
        dislikes: [],
        userId,
        views: 0,
        categoryId,
      },
    });

    return NextResponse.json({ message: video }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
