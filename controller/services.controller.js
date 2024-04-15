const pool = require("../db/index");

const servicesController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("select * from service");
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
        "select * from service where SRV_ID=?",
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
        `select * from service where SRV_ID like '%${s}%' or SRV_NAME like '%${s}%'`
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

  getByPrice: async (req, res) => {
    try {
      const { from, to } = req.params;
      const [rows, fields] = await pool.query(
        "select * from service where SRV_PRICE between ? and ? ",
        [from, to]
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

  getRate: async (req, res) => {
    try {
      const {id} = req.params
      const [rows, fields] = await pool.query("select r.*, c.CTM_NAME from rate r join customer c on c.CTM_ID=r.CTM_ID where r.SRV_ID=?",[id])
      res.json({
        data: rows,
        message: "OK"
      })
    } catch (error) {
      res.json({
        data: [],
        message: "Lỗi: " + error,
      });
    }
  },
  // PUT _ UPDATE

  update: async (req, res) => {
    try {
      const { id } = req.params
      const { name, price, des, stt } = req.body;
      const [rows, fields] = await pool.query(
        "update service set SRV_NAME='"+name+"', SRV_DESCRIPTION='"+des+"', SRV_PRICE="+price+", SRV_ISAVAILABLE="+stt+" where SRV_ID=?",
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
  }

};



module.exports = servicesController;
