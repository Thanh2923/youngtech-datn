const revenueService = require("../services/revenueService");

const revenueController = {
    getRevenue: async (req, res) => {
    try {
      const revenues = await revenueService.getRevenue(req.query);
      res.status(200).json(revenues);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = revenueController;
