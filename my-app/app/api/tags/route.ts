import {NextResponse} from "next/server";
import {Tags} from "@/lib/models/events";

export async function GET() {
    return NextResponse.json(Tags);
}