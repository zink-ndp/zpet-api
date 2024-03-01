const pool = require("../db/index");
const usuallyFunc = require("../functions");

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

      var exceptStt = "";
      switch (stt) {
        case "1":
          exceptStt = "and apms.APM_ID NOT IN (select t.APM_ID from apm_stt t where t.STT_ID=2 or t.STT_ID=3 or t.STT_ID=4)";
          break;
        case "2":
          exceptStt = "and apms.APM_ID NOT IN (select t.APM_ID from apm_stt t where t.STT_ID=3 or t.STT_ID=4)";
          break;
        case "3":
          exceptStt = "and apms.APM_ID NOT IN (select t.APM_ID from apm_stt t where t.STT_ID=4)";
          break;
        case "4":
          exceptStt = "";
          break;

        default:
          break;
      }

      var query = `SELECT a.*, apms.*, c.CTM_NAME FROM apm_stt apms join appointment a on a.APM_ID = apms.APM_ID join customer c on c.CTM_ID = a.CTM_ID where STT_ID=${stt} ${exceptStt}`;

      const [rows, fields] = await pool.query(query);

      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "error" + error,
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
        message: "error" + error,
      });
    }
  },

  getSttById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * from apm_stt apms join appointment a on a.APM_ID = apms.APM_ID join status s on s.STT_ID = apms.STT_ID where a.APM_ID=? order by apms.STT_ID desc",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
      res.json({
        message: "error" + error,
      });
    }
  },

  // UPDATE - PUT

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { sttId, sttDescription } = req.body;
      const dateTime = usuallyFunc.getNow();
      const [rows, fields] = await pool.query("insert into timing values (?)", [dateTime])
        .then(
          pool.query("insert into apm_stt values (?,?,?,?)", [
            id,
            dateTime,
            sttId,
            sttDescription,
          ])
        );
      res.json({
        data: rows,
        message: "Update thành công!",
      });
    } catch (error) {
      res.json({
        data: error,
        message: "Update thất bại!",
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

      const dateTime = usuallyFunc.getNow();

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
            1,
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
        message: "Tạo lịch hẹn thành công!",
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
};

module.exports = appointmentController;
