const pool = require("../db/index");

const invoicesController = {
  getAll: async (req, res) => {
    try {
      const { rows, fields } = await pool.query("select * from invoice");
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

  getShipFee: async (req, res) => {
    try {
      const { dist } = req.params;
      const sql = "select * from shipping_fee where SF_DISTANCE <= "+dist+" order by SF_FEE desc limit 1"
      const [ rows, fields ] = await pool.query(sql);
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

module.exports = invoicesController;
