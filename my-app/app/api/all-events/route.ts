import { getAllEvents } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";
import EventModel from "@/lib/models/event";
import { createEvent } from "@/lib/actions";

type Event = {
  id: string;
  title: string;
  category?: string;
  location?: string;
  date?: string;
};

export async function GET(request: NextRequest) {
  try {
    //await connect();
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

export async function POST(request: NextRequest) {
  try {
    //await connect();

    const body = await request.json();

    const savedEvent = createEvent(body);

    return NextResponse.json(savedEvent, { status: 201 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating event" }, { status: 500 });
  }
}