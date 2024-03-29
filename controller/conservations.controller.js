const pool = require("../db/index");
const { getNow } = require("../functions");

const conservationsController = {
  getList: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select cus.CTM_NAME from conservation c join customer cus on cus.CTM_ID=c.CTM_ID where STF_ID=? group by c.CTM_ID",
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

  getChat: async (req, res) => {
    try {
      const { sId, cId } = req.params;
      const [rows, fields] = await pool.query(
        "select * from conservation where STF_ID=? and CTM_ID=? order by ATTIME asc",
        [sId, cId]
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

  // POST
  postChat: async (req, res) => {
    try {
      const { sId, cId } = req.params;
      const { content, fromCus } = req.body;
      const timeNow = getNow();
      const [rows, fields] = await pool
        .query("insert into timing values (?)", [timeNow])
        .then(setTimeout(() => {}, 1000))
        .then(
          pool.query("insert into conservation values (?,?,?,?,?)", [
            timeNow,
            sId,
            cId,
            content,
            fromCus,
          ])
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

module.exports = conservationsController;
