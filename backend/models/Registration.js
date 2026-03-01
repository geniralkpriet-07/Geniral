import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamLeader: {
    name: String,
    email: String,
    rollNumber: String,
    phone: String,
    department: String,
  },
  teamMembers: [{
    name: String,
    email: String,
    rollNumber: String,
    department: String,
  }],
  teamSize: {
    type: Number,
    default: 1
  },
  referredBy: {
    type: String, // The full code (EVENT-USERID)
  },
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
