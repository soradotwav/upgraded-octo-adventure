import { getAllEvents } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

type Event = {
  id: string;
  title: string;
  category?: string;
  location?: string;
  date?: string;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const date = searchParams.get('date');

    let events: Event[] = await getAllEvents();

    if (category) {
      events = events.filter((event) => event.category?.toLowerCase() === category.toLowerCase());
    }

    if (location) {
      events = events.filter((event) => event.location?.toLowerCase() === location.toLowerCase());
    }

    if (date) {
      events = events.filter((event) => event.date === date);
    }

    console.log(location)

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}
