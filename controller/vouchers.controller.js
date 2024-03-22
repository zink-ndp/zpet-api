const pool = require("../db/index");

const vouchersController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("select * from voucher");
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "Lỗi: " + error,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from voucher where VOU_ID = ?",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "Lỗi: " + error,
      });
    }
  },

  getSearch: async (req, res) => {
    try {
      const { s } = req.params;
      const [rows, fields] = await pool.query(
        `select * from voucher where VOU_ID like '%${s}%' or VOU_NAME like '%${s}%' or VOU_PERCENT like '%${s}%'`
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "Lỗi: " + error,
      });
    }
  },

  // PUT

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, des, srv, percent, price, stt } = req.body;
      const [rows, fields] = await pool.query(
        `update voucher set VOU_NAME='${name}', VOU_DESCRIPTION='${des}', SRV_ID=${srv}, VOU_PERCENT=${percent}, VOU_EXCHANGEPRICE=${price}, VOU_ISAVAILABLE=${stt} where VOU_ID=${id}`
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "Lỗi: " + error,
      });
    }
  },
};

module.exports = vouchersController;
