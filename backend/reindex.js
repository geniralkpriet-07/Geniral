import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";
import { upsertToVectorStore, initVectorStore } from "./utils/vectorStore.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kai_campus_hub";

async function reindex() {
    try {
        console.log("🚀 Starting Vector Re-indexing...");

        // 1. Connect MongoDB
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");

        // 2. Initialize Vector Store (Creates collection if needed)
        await initVectorStore();

        // 3. Fetch approved events
        const events = await Event.find({ status: 'approved' });
        console.log(`🔍 Found ${events.length} approved events to index.`);

        // 4. Index each event
        for (const event of events) {
            console.log(`⏳ Indexing: ${event.title}...`);
            const text = `Event: ${event.title}. Category: ${event.category?.replace(/_/g, ' ')}. Venue: ${event.venue}. Description: ${event.description}`;
            await upsertToVectorStore(event._id, text, {
                id: event._id,
                title: event.title,
                type: 'event'
            });
        }

        console.log("✨ Re-indexing Complete! Your AI should now be able to see all events.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Re-indexing Failed:", error.message);
        process.exit(1);
    }
}

reindex();
