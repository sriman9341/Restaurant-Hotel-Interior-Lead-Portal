const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  addLeadNote
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

// Public route for client enquiry form submission
router.post('/', createLead);

// Protected routes for managing leads
router.get('/', protect, getLeads);

// Public status tracking page path
router.get('/:id', getLead);

// Protected details updates
router.put('/:id', protect, updateLead);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);
router.post('/:id/notes', protect, addLeadNote);

module.exports = router;
