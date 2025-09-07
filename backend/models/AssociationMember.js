import mongoose from "mongoose";
const Schema = mongoose.Schema;

const associationHeadSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: [
      'President', 
      'Vice President', 
      'Secretary', 
      'Vice Secretary', 
      'Treasurer', 
      'Joint Treasurer',
      'Club Head',
      'Member'
    ]
  },
  avatarBase64: {
    type: String,
    default: ''
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Online', 'Away', 'Offline'],
    default: 'Offline'
  },
  class: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const AssociationHead = mongoose.model('AssociationHead', associationHeadSchema);

export default AssociationHead;