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

    if (channel && !channel.subscribe.includes(userId)) {
      //User is not subscribed.. push the userId to  subscribe array and pop the userId from unsubscribe array
      await prismadb.channel.update({
        where: {
          id,
        },
        data: {
          subscribe: {
            push: userId,
          },
          unsubscribe: {
            set: channel.unsubscribe.filter((subId) => subId !== userId),
          },
        },
      });
      return NextResponse.json({ message: "Subscribed" }, { status: 200 });
    }
    return NextResponse.json({ message: channel?.subscribe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
