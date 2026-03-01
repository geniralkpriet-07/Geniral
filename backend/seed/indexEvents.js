import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Event from '../models/Event.js';
import { initializeCollection, addEventToVector } from '../utils/qdrantClient.js';
import { generateEmbedding } from '../utils/ollamaClient.js';

dotenv.config();

const indexEventsToQdrant = async () => {
    console.log('🚀 Starting event indexing to Qdrant...\n');
    
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('✅ Connected to MongoDB\n');
        
        // Initialize Qdrant collection
        await initializeCollection();
        console.log('✅ Qdrant collection initialized\n');
        
        // Fetch all approved events
        const events = await Event.find({ status: 'approved' }).lean();
        console.log(`📊 Found ${events.length} approved events to index\n`);
        
        if (events.length === 0) {
            console.log('⚠️  No events to index. Exiting...');
            process.exit(0);
        }
        
        // Index each event
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            try {
                // Create searchable text
                const searchText = `${event.title} ${event.description} ${event.category?.replace(/_/g, ' ')} ${event.department} ${event.venue} ${event.tags?.join(' ') || ''}`;
                
                // Generate embedding
                console.log(`[${i + 1}/${events.length}] Generating embedding for: ${event.title}`);
                const embedding = await generateEmbedding(searchText);
                
                // Add to Qdrant
                await addEventToVector(event, embedding);
                successCount++;
                console.log(`✅ Indexed successfully\n`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Error indexing event: ${event.title}`);
                console.error(`   Error: ${error.message}\n`);
            }
        }
        
        console.log('\n📊 Indexing Complete!');
        console.log(`   ✅ Success: ${successCount}`);
        console.log(`   ❌ Errors: ${errorCount}`);
        console.log(`   Total: ${events.length}\n`);
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Fatal error during indexing:', error);
        process.exit(1);
    }
};

// Run the indexing
indexEventsToQdrant();
