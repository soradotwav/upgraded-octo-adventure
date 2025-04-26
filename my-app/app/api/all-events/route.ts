import { getAllEvents } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return await getAllEvents();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}
