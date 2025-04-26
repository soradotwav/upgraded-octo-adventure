import { getAllEvents } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}
