const pool = require("../db/index");

const staffsController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("select * from staff");
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
        "select * from staff where STF_ID=?",
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
        `select * from staff where STF_ID like '%${s}%' or STF_EMAIL like '%${s}%' or STF_NAME like '%${s}%' or STF_PHONE like '%${s}%'`
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

  getInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select i.*, v.*, a.*, c.*, s.STF_NAME from invoice i join staff s on s.STF_ID=i.STF_ID join customer c on c.CTM_ID=i.CTM_ID left join voucher v on v.VOU_ID=i.VOU_ID left join address a on a.ADR_ID=i.ADR_ID where s.STF_ID=? order by (STR_TO_DATE(SUBSTRING_INDEX(INV_CREATEDAT, '-', -1) , '%d/%m/%Y')) desc",
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

  getRoleList: async (req, res) => {
    try {
      const { isAd } = req.params;
      const [rows, fields] = await pool.query(
        "select * from staff where STF_ISMANAGER=?",
        [isAd]
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

  getStatusList: async (req, res) => {
    try {
      const { isWk } = req.params;
      const [rows, fields] = await pool.query(
        "select * from staff where STF_ISWORKING=?",
        [isWk]
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
  login: async (req, res) => {
    try {
      const { email, pw, role } = req.body;
      const [rows, fields] = await pool.query(
        "select STF_ID, STF_EMAIL, STF_NAME, STF_PHONE, STF_ISMANAGER from staff where STF_EMAIL=? and STF_PASSWORD=? and STF_ISMANAGER=? and STF_ISWORKING=1",
        [email, pw, role]
      );

      if (rows.length > 0 && rows[0].STF_ISWORKING != 0) {
        res.json({
          auth: true,
          data: rows,
          message: "Đăng nhập thành công",
        });
      } else {
        res.json({
          auth: false,
          data: [],
          message: "Thông tin đăng nhập không đúng",
        });
      }
    } catch (error) {
      res.json({
        message: "Lỗi: " + error,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, pw, stt, isAd } = req.body;
      const sql = `update staff set STF_NAME='${name}', STF_PHONE='${phone}', STF_EMAIL='${email}', STF_PASSWORD='${pw}', STF_ISMANAGER=${isAd}, STF_ISWORKING=${stt} where STF_ID=${id}`;
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

module.exports = staffsController;
