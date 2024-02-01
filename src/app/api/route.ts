import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  try {
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
