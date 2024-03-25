const pool = require("../db/index");
const { getNextId, getNow } = require("../functions");

const invoicesController = {
  // GET

  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "select i.*, v.*, a.*, c.*, s.STF_NAME from invoice i join staff s on s.STF_ID=i.STF_ID join customer c on c.CTM_ID=i.CTM_ID left join voucher v on v.VOU_ID=i.VOU_ID left join address a on a.ADR_ID=i.ADR_ID order by (STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y')) desc"
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
        `select i.*, v.*, a.*, c.*, s.STF_NAME from invoice i join staff s on s.STF_ID=i.STF_ID join customer c on c.CTM_ID=i.CTM_ID left join voucher v on v.VOU_ID=i.VOU_ID left join address a on a.ADR_ID=i.ADR_ID where i.INV_ID like '%${s}%' or i.INV_CREATEDAT like '%${s}%' or c.CTM_NAME like '%${s}%'`
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
        "select i.*, v.*, a.*, c.*, s.STF_NAME from invoice i join staff s on s.STF_ID=i.STF_ID join customer c on c.CTM_ID=i.CTM_ID left join voucher v on v.VOU_ID=i.VOU_ID left join address a on a.ADR_ID=i.ADR_ID where i.INV_ID=" +
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
      const {
        vou,
        cusId,
        sfId,
        stfId,
        adrId,
        pId,
        total,
        time,
        services,
        point,
      } = req.body;

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

      const [pointRow, pointFields] = await pool.query(
        "select P_TOTAL as p from point where CTM_ID=? order by p desc limit 1",
        [cusId]
      );

      const ptt = pointRow[0].p;
      const timeNow = getNow();

      const [rows, fields] = await pool
        .query("insert into timing values (?)", [timeNow])
        .then(  
          pool.query(
            "insert into point (`CTM_ID`, `ATTIME`, `P_CHANGE`, `P_ISEARN`, `P_TOTAL`) VALUES (?,?,?,?,?);",
            [cusId, timeNow, point, 1, parseInt(ptt) + parseInt(point)]
          )
        )
        .then(pool.query(sql))
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
