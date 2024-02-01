import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const category = await prismadb.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({ message: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
