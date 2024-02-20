const pool = require("../db/index");

const petsController = {
  //GET
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "select * from pet p join pet_type pt on pt.PT_ID = p.PT_ID join pet_image pi on pi.P_ID = p.P_ID where pi.PIMG_ISMAINIMG=true"
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
       res.json({
        message: "Lỗi: ",
        error,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from pet p join pet_type pt on pt.PT_ID = p.PT_ID where p.P_ID=?",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
        res.json({
            message: "Lỗi: ",
            error,
          });
    }
  },

  getMainImg: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from pet p join pet_image pi on pi.P_ID = p.P_ID where p.P_ID=? and pi.PIMG_ISMAINIMG=true",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
        res.json({
            message: "Lỗi: ",
            error,
          });
    }
  },

  getImgs: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select pi.P_ID, pi.PIMG_LINK from pet p join pet_image pi on pi.P_ID = p.P_ID where p.P_ID=?",
        [id]
      );
      res.json({
        data: rows,
        message: "OK",
      });
    } catch (error) {
        res.json({
            message: "Lỗi: ",
            error,
          });
    }
  },
};

module.exports = petsController;
