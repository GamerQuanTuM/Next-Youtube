import { NextResponse } from "next/server";
import { prismadb } from "@/utils/prismadb";

export async function POST(req: Request) {
  const { id, userId } = await req.json();

  try {
    const channel = await prismadb.channel.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (channel && channel.subscribe.includes(userId)) {
      //User is subscribed.. push the userId to  unsubscribe array and pop the userId from usubscribe array
      await prismadb.channel.update({
        where: {
          id,
        },
        data: {
          unsubscribe: {
            push: userId,
          },
          subscribe: {
            set: channel.unsubscribe.filter((subId) => subId !== userId),
          },
        },
      });
      return NextResponse.json({ message: "Unsubscribed" }, { status: 200 });
    }
    return NextResponse.json({ message: channel?.unsubscribe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
