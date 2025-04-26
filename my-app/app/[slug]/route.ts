import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  // const { slug } = params;
  console.log(params);
  await connect();
  const users = await User.find();
  return NextResponse.json(users);



}
