import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'social', 'academic'],
    default: 'technical'
  },
  joinLink: {
    type: String, 
    required: true
  },
  logoUrl: {
    type: String,
    default: ""
  },
  membersCount: {
    type: Number,
    default: 0
  },
  leads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isApproved: {
    type: Boolean,
    default: true  // auto-approve; admin can revoke via dashboard
  }
}, {
  timestamps: true
});

const Club = mongoose.model('Club', clubSchema);

export default Club;