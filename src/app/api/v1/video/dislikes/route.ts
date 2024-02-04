import { NextResponse } from "next/server";
import { prismadb } from "@/utils/prismadb";

export async function POST(req: Request) {
  const { id, userId } = await req.json();

  try {
    const video = await prismadb.video.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (video && video.likes.includes(userId)) {
      //User has liked the video.. push the userId to  disikes array and pop the userId from likes  array
      await prismadb.video.update({
        where: {
          id,
        },
        data: {
          dislikes: {
            push: userId,
          },
          likes: {
            set: video.dislikes.filter((subId) => subId !== userId),
          },
        },
      });
      return NextResponse.json({ message: "Unsubscribed" }, { status: 200 });
    }
    return NextResponse.json({ message: video?.dislikes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
