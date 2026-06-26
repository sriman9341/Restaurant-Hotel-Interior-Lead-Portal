const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a client name']
  },
  mobile: {
    type: String,
    required: [true, 'Please add a mobile number']
  },
  email: {
    type: String,
    required: [true, 'Please add a valid email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  company: {
    type: String
  },
  projectType: {
    type: String,
    required: [true, 'Please select a project type'],
    enum: ['Restaurant', 'Hotel', 'Cafe', 'Resort', 'Banquet Hall']
  },
  seatingCapacity: {
    type: Number,
    required: [true, 'Please add seating capacity'],
    min: [0, 'Seating capacity cannot be negative']
  },
  area: {
    type: Number,
    required: [true, 'Please add the carpet area in square feet'],
    min: [0, 'Area cannot be negative']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  theme: {
    type: String,
    required: [true, 'Please select a design theme'],
    enum: ['Luxury', 'Modern', 'Contemporary', 'Industrial', 'Traditional']
  },
  kitchenRequired: {
    type: Boolean,
    default: false
  },
  barRequired: {
    type: Boolean,
    default: false
  },
  outdoorSeating: {
    type: Boolean,
    default: false
  },
  budget: {
    type: String,
    required: [true, 'Please select a budget range'],
    enum: [
      'Under 5 Lakhs',
      '5–10 Lakhs',
      '10–25 Lakhs',
      '25–50 Lakhs',
      'Above 50 Lakhs'
    ]
  },
  timeline: {
    type: String,
    required: [true, 'Please select a timeline'],
    enum: ['Immediate', 'Within 1 Month', '1–3 Months', '3–6 Months']
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: [
      'New Lead',
      'Contacted',
      'Site Visit Scheduled',
      'Requirement Gathering',
      'Quotation Sent',
      'Design Approval',
      'Project Started',
      'Completed'
    ],
    default: 'New Lead'
  },
  owner: {
    type: String,
    default: 'Unassigned'
  },
  internalNotes: [
    {
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      author: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
LeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', LeadSchema);
