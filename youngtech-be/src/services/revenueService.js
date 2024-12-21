const revenueRepository = require("../repositories/revenueRepository");

const revenueService = {
    getRevenue: async (data)=>{
        const {startDate, endDate} = data
        return await revenueRepository.getRevenue({startDate, endDate});
    },  
 };

 module.exports = revenueService;