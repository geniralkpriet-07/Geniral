import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  metadata: {
    eventsUsed: [String],
    responseTime: Number,
    tokenCount: Number,
  },
}, {
  timestamps: true,
});

// Compound index for efficient session queries
messageSchema.index({ sessionId: 1, createdAt: 1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;
