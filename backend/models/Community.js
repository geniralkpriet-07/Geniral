import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    platform: {
        type: String,
        enum: ['whatsapp', 'discord', 'telegram'],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: String,
    joinCount: {
        type: Number,
        default: 0
    },
    category: String
}, {
    timestamps: true
});

const Community = mongoose.model('Community', communitySchema);
export default Community;
