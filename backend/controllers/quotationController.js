const Quotation = require('../models/Quotation');
const Lead = require('../models/Lead');

// @desc    Create or update a quotation
// @route   POST /api/quotations
// @access  Private
const createOrUpdateQuotation = async (req, res) => {
  try {
    const {
      leadId,
      designCost,
      furnitureCost,
      lightingCost,
      flooringCost,
      civilWorkCost,
      miscellaneousCost
    } = req.body;

    if (!leadId) {
      return res.status(400).json({ success: false, error: 'Lead ID is required' });
    }

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    const dCost = Number(designCost) || 0;
    const fCost = Number(furnitureCost) || 0;
    const lCost = Number(lightingCost) || 0;
    const flCost = Number(flooringCost) || 0;
    const cCost = Number(civilWorkCost) || 0;
    const mCost = Number(miscellaneousCost) || 0;

    const subtotal = dCost + fCost + lCost + flCost + cCost + mCost;
    const gst = Math.round(subtotal * 0.18 * 100) / 100;
    const total = subtotal + gst;

    let quotation = await Quotation.findOne({ leadId });

    if (quotation) {
      quotation.designCost = dCost;
      quotation.furnitureCost = fCost;
      quotation.lightingCost = lCost;
      quotation.flooringCost = flCost;
      quotation.civilWorkCost = cCost;
      quotation.miscellaneousCost = mCost;
      quotation.subtotal = subtotal;
      quotation.gst = gst;
      quotation.total = total;
      await quotation.save();
    } else {
      quotation = await Quotation.create({
        leadId,
        designCost: dCost,
        furnitureCost: fCost,
        lightingCost: lCost,
        flooringCost: flCost,
        civilWorkCost: cCost,
        miscellaneousCost: mCost,
        subtotal,
        gst,
        total
      });
    }

    const lowerStages = ['New Lead', 'Contacted', 'Site Visit Scheduled', 'Requirement Gathering'];
    if (lowerStages.includes(lead.status)) {
      lead.status = 'Quotation Sent';
      await lead.save();
    }

    return res.status(200).json({ success: true, data: quotation });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get quotation by Lead ID
// @route   GET /api/quotations/lead/:leadId
// @access  Public
const getQuotationByLeadId = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({ leadId: req.params.leadId }).populate('leadId');
    if (!quotation) {
      return res.status(404).json({ success: false, error: 'Quotation not found for this lead' });
    }
    return res.json({ success: true, data: quotation });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single quotation by ID
// @route   GET /api/quotations/:id
// @access  Public
const getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id).populate('leadId');
    if (!quotation) {
      return res.status(404).json({ success: false, error: 'Quotation not found' });
    }
    return res.json({ success: true, data: quotation });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createOrUpdateQuotation,
  getQuotationByLeadId,
  getQuotation
};
