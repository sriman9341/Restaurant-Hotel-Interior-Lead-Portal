const Lead = require('../models/Lead');
const Quotation = require('../models/Quotation');

// @desc    Get dashboard stats (simple counts & aggregates)
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    // Group leads by status
    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const stats = {
      totalLeads,
      'New Lead': 0,
      'Contacted': 0,
      'Site Visit Scheduled': 0,
      'Requirement Gathering': 0,
      'Quotation Sent': 0,
      'Design Approval': 0,
      'Project Started': 0,
      'Completed': 0
    };

    statusCounts.forEach((s) => {
      if (stats.hasOwnProperty(s._id)) {
        stats[s._id] = s.count;
      }
    });

    // Average project sizes
    const averages = await Lead.aggregate([
      {
        $group: {
          _id: null,
          avgArea: { $avg: '$area' },
          avgCapacity: { $avg: '$seatingCapacity' }
        }
      }
    ]);

    stats.avgArea = averages.length > 0 ? Math.round(averages[0].avgArea) : 0;
    stats.avgCapacity = averages.length > 0 ? Math.round(averages[0].avgCapacity) : 0;

    // Total quotation sum
    const totalQuotations = await Quotation.aggregate([
      { $group: { _id: null, totalVal: { $sum: '$total' } } }
    ]);
    stats.totalQuotationVal = totalQuotations.length > 0 ? totalQuotations[0].totalVal : 0;

    return res.json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get data structured for Recharts visualization
// @route   GET /api/dashboard/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    // 1. Project Type Distribution
    const projectTypes = await Lead.aggregate([
      { $group: { _id: '$projectType', value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } }
    ]);

    // 2. Budget Distribution
    const budgets = await Lead.aggregate([
      { $group: { _id: '$budget', value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } }
    ]);

    // 3. Leads by Status
    const statuses = await Lead.aggregate([
      { $group: { _id: '$status', value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } }
    ]);

    // 4. Monthly Growth (last 6 months)
    const monthlyGrowth = await Lead.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 6 }
    ]);

    const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthly = monthlyGrowth.map((item) => ({
      name: `${monthNames[item._id.month]} ${item._id.year}`,
      Leads: item.count
    }));

    return res.json({
      success: true,
      data: {
        projectTypes,
        budgets,
        statuses,
        monthlyGrowth: formattedMonthly
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getStats,
  getAnalytics
};
