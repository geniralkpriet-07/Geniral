import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logoBase64: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: '' // For rich text content about the club
  },
  members: {
    type: Number,
    default: 0
  },
  faculty: [{
    name: {
      type: String,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'Coordinator'
    },
    imageBase64: {
      type: String,
      default: ''
    }
  }],
  head: {
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'Club Head'
    },
    email: {
      type: String,
      default: ''
    },
    imageBase64: {
      type: String,
      default: ''
    }
  },
  memberList: [{
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'Member'
    },
    imageBase64: {
      type: String,
      default: ''
    }
  }],
  achievements: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  events: [{
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }]
}, {
  timestamps: true
});

const Club = mongoose.model('Club', clubSchema);

export default Club;