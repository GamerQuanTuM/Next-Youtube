import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const video = await prismadb.video.findFirst({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: video }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
