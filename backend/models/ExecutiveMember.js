import mongoose from 'mongoose';

const executiveMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  role: {
    type: String,
    default: 'Member',
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  avatarBase64: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        // Skip validation if empty
        return !v || v.startsWith('data:image');
      },
      message: 'Avatar must be a valid base64 encoded image or empty'
    }
  },
  status: {
    type: String,
    enum: ['Online', 'Away', 'Offline'],
    default: 'Offline'
  },
  linkedin: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ExecutiveMember = mongoose.model('ExecutiveMember', executiveMemberSchema);

export default ExecutiveMember;