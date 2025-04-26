import Event from "@/lib/models/event";
import connect from "@/lib/db";
import User from "@/lib/models/user";

/**
 * Searches for events in the database based on specified criteria.
 *
 * @param {Object} params - The search parameters.
 * @param {string} [params.title] - The title of the event to search for, using a case-insensitive regex match.
 * @param {Date} [params.dateStart] - The start date of the date range to search within.
 * @param {Date} [params.dateEnd] - The end date of the date range to search within.
 * @param {string} [params.location] - The location of the event to search for, using a case-insensitive regex match.
 * @param {string[]} [params.tags] - An array of tags to search for events that contain any of these tags.
 * @returns {Promise<any>} - A promise that resolves to the list of events matching the search criteria. 
 *                          or an empty array if no events are found.
 */
export async function searchEvents({
    title,
    dateStart,
    dateEnd,
    location,
    tags,
}: {
    title?: string;
    dateStart?: Date;
    dateEnd?: Date;
    location?: string;
    tags?: string[];
}): Promise<any> {
    const query: any = {};

    if (title) {
        query.title = { $regex: title, $options: "i" };
    }

    if (dateStart && dateEnd) {
        query.date = { $gte: dateStart, $lte: dateEnd };
    }

    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    if (tags) {
        query.tags = { $in: tags };
    }

    await connect();
    return Event.find(query);
}

/**
 * Gets all events from the database.
 * @returns {Promise<any>} - A promise that resolves to an array of all events in the database.
 */
export async function getAllEvents() {
    await connect();
    return Event.find();
}

/**
 * Gets a user by their id.
 * @param id - The id of the user.
 * @returns {Promise<any>} - A promise that resolves to the user with the given id, or null if no such user exists.
 */
export async function getUserById(id: string) {
    await connect();
    return User.findById(id);
}

/**
 * Logs a user in and returns the user if the login is successful, otherwise
 * returns null.
 * @param email - The email of the user to log in.
 * @param password - The password of the user to log in.
 * @returns {Promise<any>} - A promise that resolves to the user if the login
 *                           is successful, otherwise resolves to null.
 */
export async function loginUser(email: string, password: string) {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }
    if (user.password !== password) {
        return null;
    }
    return user;
}

/**
 * Creates a new event in the database.
 * 
 * @param event - An object containing event details that conform to the event schema.
 * @returns {Promise<any>} - A promise that resolves to the newly created event.
 */

export async function createEvent(event: any) {
    await connect();
    // pass in event object that meets the schema
    const newEvent = new Event(event);
    await newEvent.save();
    return newEvent;
}

/**
 * Updates an existing event in the database.
 * 
 * @param event - An object containing updated event details that conform to the event schema.
 * @param id - The id of the event to update.
 * @returns {Promise<any>} - A promise that resolves to the newly updated event document.
 */
export async function updateEvent(event: any, id: string) {
    await connect();
    // return updated document rather then the original
    return Event.findByIdAndUpdate(id, event, { new: true });
}