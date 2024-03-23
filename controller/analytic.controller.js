const pool = require("../db/index");
const usuallyFunc = require("../functions");

const analyticContoller = {
  getRevenue: async (req, res) => {
    try {
      const { dF, dT } = req.body;
      const sql_revenue = `SELECT sum(INV_TOTAL) as revenue from invoice where (STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y') BETWEEN '${dF}' and '${dT}')`;
      const sql_monthly = `select YEAR((STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y'))) as year, MONTH((STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y'))) as month, sum(INV_TOTAL) as total from invoice where (STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y') BETWEEN '${dF}' and '${dT}') group by YEAR((STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y'))), MONTH((STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y')))`;
      const [rowsRevenue, fieldsRevenue] = await pool.query(sql_revenue);
      const [rowsMonthly, fieldsMonthly] = await pool.query(sql_monthly);
      if (rowsRevenue && rowsMonthly) {
        res.json({
          total: rowsRevenue,
          monthly: rowsMonthly,
          message: "OK",
        });
      } else {
        res.json({
          total: [{ revenue: 0 }],
          monthly: rowsMonthly,
          message: "OK",
        });
      }
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
};

module.exports = analyticContoller;
