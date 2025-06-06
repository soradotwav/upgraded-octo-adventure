import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017";

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected");
        return;
    }

    if (connectionState === 2) {
        console.log("Connecting...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "event-planner",
            bufferCommands: true,
        });
        console.log("Connected");
    } catch (error) {
        console.log("Error in connecting to database", error);
        throw new Error("Error connecting to database");
    }
};

export default connect;
