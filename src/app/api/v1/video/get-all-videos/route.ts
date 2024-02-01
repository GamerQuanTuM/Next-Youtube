import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const videos = await prismadb.video.findMany({});
    return NextResponse.json({ message: videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
