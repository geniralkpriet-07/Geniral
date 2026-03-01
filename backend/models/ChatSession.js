import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  userRole: {
    type: String,
    enum: ['student', 'admin', 'guest', 'campus_captain', 'user'],
    default: 'guest',
  },
  title: {
    type: String,
    default: 'New Chat',
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
  messageCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Index for user lookups
chatSessionSchema.index({ userId: 1, lastActiveAt: -1 });

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
