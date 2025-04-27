import { Schema, model, models } from "mongoose";

export interface EventObject {
    id: string;
    title: string;
    body: string;
    description: string;
    organizer: string;
    date: Date;
    location?: string;
    thumbnail?: string;
    attendees: number;
    maxAttendees?: number;
    contact?: string;
    price?: number;
    isPublic: boolean;
    tags?: string[];
    type: string;
}

export const Tags: string[] = [
    "Academic",
    "Sports",
    "Arts",
    "Social",
    "Career",
    "Workshop"
]

const EventSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    location: { type: String, required: false },
    thumbnail: { type: String, required: false },
    attendees: {type: Number, required: true},
    maxAttendees: { type: Number, required: false },
    contact: { type: String, required: false },
    price: { type: Number, required: false },
    isPublic: { type: Boolean, required: true },
    tags: { type: Tags, required: false }
});

const Event = models.Event || model("Event", EventSchema);

export default Event;

