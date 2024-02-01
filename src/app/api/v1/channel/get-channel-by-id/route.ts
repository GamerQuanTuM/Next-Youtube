import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clerk_id } = await req.json();

  try {
    const user = await prismadb.user.findFirst({
      where: {
        clerk_id,
      },
    });

    const channel = await prismadb.channel.findFirst({
      where: {
        userId: user?.id,
      },
    });
    return NextResponse.json({ message: channel }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
