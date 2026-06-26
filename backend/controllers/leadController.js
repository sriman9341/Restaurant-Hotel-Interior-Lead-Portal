const Lead = require('../models/Lead');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    return res.status(201).json({ success: true, data: lead });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all leads with search, filter, sort, pagination
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude from direct match query
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Search functionality
    let searchCriteria = {};
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      searchCriteria = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { mobile: searchRegex },
          { company: searchRegex },
          { location: searchRegex }
        ]
      };
    }

    // Merge search and exact match query
    const finalQuery = { ...reqQuery, ...searchCriteria };

    query = Lead.find(finalQuery);

    // Sort options
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination setup
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Lead.countDocuments(finalQuery);

    query = query.skip(startIndex).limit(limit);

    const leads = await query;

    // Pagination info
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    return res.json({
      success: true,
      count: leads.length,
      pagination,
      totalLeads: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: leads
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Public
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    return res.json({ success: true, data: lead });
  } catch (error) {
    return res.status(400).json({ success: false, error: 'Invalid Lead ID or error fetching' });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    return res.json({ success: true, data: lead });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update lead status only
// @route   PATCH /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    return res.json({ success: true, data: lead });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    return res.json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add internal note to lead
// @route   POST /api/leads/:id/notes
// @access  Private
const addLeadNote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: 'Note text is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    const author = req.user ? req.user.name : 'Admin';
    lead.internalNotes.push({
      text,
      author,
      date: new Date()
    });

    await lead.save();

    return res.status(201).json({ success: true, data: lead });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  addLeadNote
};
