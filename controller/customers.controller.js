const pool = require("../db/index");
const usuallyFunc = require("../functions");

const customersController = {
  //  GET
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("select * from customer");
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
        "select * from customer where CTM_ID=?",
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

  getByPhone: async (req, res) => {
    try {
      const { phone } = req.params;
      const [rows, fields] = await pool.query(
        `select * from customer where CTM_PHONE like '%${phone}%'`
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

  getAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from address where CTM_ID=?",
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
        `select* from customer where CTM_ID like '%${s}%' or CTM_NAME like '%${s}%' or CTM_PHONE like '%${s}%'`
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

  getPets: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from pet p join pet_type pt on pt.PT_ID = p.PT_ID where p.CTM_ID=?",
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

  getPoints: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from point where CTM_ID=? order by AtTime desc",
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

  getAppointments: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from appointment where CTM_ID=? order by APM_Date desc",
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

  getInvoices: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select i.*, c.CTM_NAME, s.STF_NAME from invoice i join customer c on c.CTM_ID = i.CTM_ID join staff s on s.STF_ID=i.STF_ID left join voucher v on v.VOU_ID=i.VOU_ID where i.CTM_ID=?",
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

  getRates: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from rate where CTM_ID=?",
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
  // UPDATE - PUT

  // ADD - POST

  create: async (req, res) => {
    try {
      const { phone, name } = req.body;
      const nextId = await usuallyFunc.getNextId("CTM_ID", "customer");
      const time = usuallyFunc.getNow();
      const [rows, fields] = await pool.query(
        "insert into customer values (?, ?, ?, null, '" + time + "', 1)",
        [nextId, phone, name]
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

  addAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const { receiver, province, district, ward, note, lat, lng, dist } =
        req.body;
      var nextId = await usuallyFunc.getNextId("ADR_ID", "address");
      nextId = parseInt(JSON.stringify(nextId));
      const sql =
        "insert into address values (" +
        nextId +
        "," +
        id +
        ",'" +
        receiver +
        "','" +
        province +
        "','" +
        district +
        "','" +
        ward +
        "','" +
        note +
        "','" +
        lat +
        "','" +
        lng +
        "'," +
        dist +
        ")";
      const [rows, fields] = await pool.query(sql);
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

module.exports = customersController;
