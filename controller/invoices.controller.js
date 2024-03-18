const pool = require("../db/index");
const { getNextId } = require("../functions");

const invoicesController = {
  // GET

  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "select i.*, c.CTM_NAME, s.STF_NAME from invoice i join customer c on c.CTM_ID = i.CTM_ID join staff s on s.STF_ID=i.STF_ID left join voucher v on v.VOU_ID=i.VOU_ID"
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

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const sqlInfo =
        "select i.*, v.*, s.STF_NAME from invoice i join staff s on s.STF_ID=i.STF_ID left join voucher v on v.VOU_ID=i.VOU_ID where i.INV_ID=" +
        id;
      const sqlDetail =
        "select s.* from invoice i join inv_include_srv iis on i.INV_ID=iis.INV_ID join service s on s.SRV_ID=iis.SRV_ID where i.INV_ID=" +
        id;
      const [rowsInfo, fieldsI] = await pool.query(sqlInfo);
      const [rowsDetail, fieldsD] = await pool.query(sqlDetail);
      res.json({
        info: rowsInfo,
        detail: rowsDetail,
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
      const { vou, cusId, sfId, stfId, adrId, pId, total, time, services } =
        req.body;
      const sql =
        "insert into invoice values (" +
        nextId +
        ", " +
        sfId +
        ", " +
        stfId +
        ", " +
        adrId +
        ", " +
        cusId +
        "," +
        vou +
        ", " +
        pId +
        ", " +
        total +
        ", '" +
        time +
        "')";
      const [rows, fields] = await pool.query(sql)
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
        message: sql,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
};

module.exports = invoicesController;
