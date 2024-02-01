import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    comment,
    userId,
    videoId,
  }: { comment: string; userId: number; videoId: number } = body;

  console.log(body)

  try {
    const commentUpload = await prismadb.comment.create({
      data: {
        comment,
        likes: 0,
        dislikes: 0,
        subcomment: [],
        userId,
        videoId,
      },
    });
    return NextResponse.json({ message: commentUpload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
