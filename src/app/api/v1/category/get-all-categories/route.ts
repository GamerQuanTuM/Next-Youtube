import { prismadb } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany({});
    return NextResponse.json({ message: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
