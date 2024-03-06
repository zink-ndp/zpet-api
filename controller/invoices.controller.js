const pool = require("../db/index");
const { getNextId } = require("../functions");

const invoicesController = {
  // GET

  getAll: async (req, res) => {
    try {
      const [ rows, fields ] = await pool.query("select i.*, c.CTM_NAME from invoice i join customer c on c.CTM_ID = i.CTM_ID");
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
      const sql =
        "select * from shipping_fee where SF_DISTANCE <= " +
        dist +
        " order by SF_FEE desc limit 1";
      const [rows, fields] = await pool.query(sql);
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

  getSearch: async (req, res) => {
    try {
      const { s } = req.params;
      const [rows, fields] = await pool.query(
        `select i.*, c.CTM_NAME from invoice i join customer c on c.CTM_ID = i.CTM_ID where i.INV_ID like '%${s}%' or i.INV_CREATEDAT like '%${s}%' or c.CTM_NAME like '%${s}%'`
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


  // POST

  create: async (req, res) => {
    try {
      const nextId = await getNextId("INV_ID", "invoice");
      const { vou, cusId, sfId, stfId, adrId, total, time, services } =
        req.body;
      const [rows, fields] = await pool
        .query(
          "insert into invoice values (" +
            nextId +
            ", " +
            vou +
            ", " +
            cusId +
            "," +
            sfId +
            ", " +
            stfId +
            ", " +
            adrId +
            ", " +
            total +
            ", '" +
            time +
            "')"
        )
        .then(
          services.forEach((srv) => {
            pool.query("insert into inv_include_srv values (?,?)", [
              parseInt(srv),
              nextId,
            ]);
          })
        );
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
