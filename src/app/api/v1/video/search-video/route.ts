import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchTerm } = await req.json();

  const SearchTerm = searchTerm.toLowerCase();

  try {
    if (!searchTerm) {
      return NextResponse.json({ message: [] }, { status: 200 });
    }
    const searchResult = await prismadb.video.findMany({
      where: {
        OR: [
          {
            title: { startsWith: SearchTerm, mode: "insensitive" },
          },
          {
            title: { contains: SearchTerm, mode: "insensitive" },
          },
        ],
      },
    });
    return NextResponse.json({ message: searchResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
