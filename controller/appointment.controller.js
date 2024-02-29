const pool = require("../db/index");

const appointmentController = {
  // GET

  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("select * from appointment");
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

  getById: async (req, res) => {
    try {
      const { id } = res.params;
      const [rows, fields] = await pool.query(
        "select * from appointment a join apm_stt astt on astt.APM_ID = a.APM_ID join apm_include_ where APM_ID=?",
        [id]
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

  getByCusId: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from appointment where CTM_ID=?",
        [id]
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

  getByStt: async (req, res) => {
    try {
      const { stt } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT distinct *, c.CTM_NAME FROM appointment a join customer c on c.CTM_ID = a.CTM_ID join apm_stt astt on astt.APM_ID = a.APM_ID where astt.STT_ID=? order by astt.ATTIME desc",
        [stt]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "error"+error,
      });
    }
  },

  getSrvById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * from service s join apm_include_srv ais on ais.SRV_ID = s.SRV_ID join appointment a on a.APM_ID = ais.APM_ID where a.APM_ID=?",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "error"+error,
      });
    }
  },

  // POST

  create: async (req, res) => {
    try {
      const { cusId, date, time, note, services } = req.body;
      var nextId;

      const sql_getMaxId = "select max(APM_ID) as maxid from appointment";
      const [rowsId, fieldsId] = await pool.query(sql_getMaxId);

      nextId = rowsId[0].maxid + 1;

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const dateTime =
        year +
        "/" +
        month +
        "/" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      const [rows, fields] = await pool
        .query("insert into timing values (?)", [dateTime])
        .then(
          pool.query("insert into appointment value (?,?,?,?,?)", [
            nextId,
            cusId,
            date,
            time,
            note,
          ])
        )
        .then(
          pool.query("insert into apm_stt values (?,?,?,?)", [
            nextId,
            dateTime,
            0,
            "Lịch hẹn đã được tạo",
          ])
        )
        .then(
          services.forEach((srv) => {
            pool.query("insert into apm_include_srv values (?,?)", [
              srv,
              nextId,
            ]);
          })
        );
      res.json({
        data: rows,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
};

module.exports = appointmentController;
