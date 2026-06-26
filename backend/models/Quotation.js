const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
    unique: true
  },
  designCost: {
    type: Number,
    required: [true, 'Please add design cost'],
    min: [0, 'Cost cannot be negative']
  },
  furnitureCost: {
    type: Number,
    required: [true, 'Please add furniture cost'],
    min: [0, 'Cost cannot be negative']
  },
  lightingCost: {
    type: Number,
    required: [true, 'Please add lighting cost'],
    min: [0, 'Cost cannot be negative']
  },
  flooringCost: {
    type: Number,
    required: [true, 'Please add flooring cost'],
    min: [0, 'Cost cannot be negative']
  },
  civilWorkCost: {
    type: Number,
    required: [true, 'Please add civil work cost'],
    min: [0, 'Cost cannot be negative']
  },
  miscellaneousCost: {
    type: Number,
    required: [true, 'Please add miscellaneous cost'],
    min: [0, 'Cost cannot be negative']
  },
  subtotal: {
    type: Number,
    required: true
  },
  gst: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quotation', QuotationSchema);
