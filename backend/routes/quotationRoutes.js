const express = require('express');
const router = express.Router();
const {
  createOrUpdateQuotation,
  getQuotationByLeadId,
  getQuotation
} = require('../controllers/quotationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrUpdateQuotation);
router.get('/lead/:leadId', getQuotationByLeadId);
router.get('/:id', getQuotation);

module.exports = router;
