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

  getByService: async (req, res) => {
    try {
      const { dF, dT } = req.body;
      const sql_bySrv = `select s.SRV_NAME as label, sum(s.SRV_PRICE) as value from invoice i join inv_include_srv iis on iis.INV_ID = i.INV_ID join service s on s.SRV_ID=iis.SRV_ID where (STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y') BETWEEN '${dF}' and '${dT}') group by s.SRV_NAME`;
      const [rows, fields] = await pool.query(sql_bySrv);
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
  getByPetType: async (req, res) => {
    try {
      const { dF, dT } = req.body;
      const sql_byPT = `select pt.PT_NAME as label, sum(i.INV_TOTAL) as value from invoice i join pet p on p.P_ID = i.P_ID join pet_type pt on pt.PT_ID=p.PT_ID where (STR_TO_DATE(SUBSTRING_INDEX(i.INV_CREATEDAT, '-', -1) , '%d/%m/%Y') BETWEEN '${dF}' and '${dT}') group by pt.PT_NAME`;
      const [rows, fields] = await pool.query(sql_byPT);
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
};

module.exports = analyticContoller;
