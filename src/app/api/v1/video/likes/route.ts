import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, userId } = await req.json();

  console.log(id,userId)

  try {
    const video = await prismadb.video.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (video && !video.likes.includes(userId)) {
      //User has not liked the video. push the userId to  likes array and pop the userId from dislike array
      await prismadb.video.update({
        where: {
          id,
        },
        data: {
          likes: {
            push: userId,
          },
          dislikes: {
            set: video.likes.filter((subId) => subId !== userId),
          },
        },
      });
      return NextResponse.json({ message: "Liked" }, { status: 200 });
    }
    return NextResponse.json({ message: video?.likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
