import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    //organizer: { type: Schema.Types.ObjectId, ref: "User", required: false },
    date: { type: Date, required: true },
    location: { type: String, required: false },
    thumbnail: { type: String, required: false },
    maxAttendees: { type: Number, required: false },
    contact: { type: String, required: false },
    price: { type: Number, required: false },
    isPublic: { type: Boolean, required: false },
    tags: { type: [String], required: false }

});

const Event = models.Event || model("Event", EventSchema);

export default Event;
