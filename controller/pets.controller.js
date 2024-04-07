const pool = require("../db/index");
const { getNextId, getNow } = require("../functions");

const petsController = {
  //GET

  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "select *, c.CTM_ID from pet p join pet_type pt on pt.PT_ID = p.PT_ID join pet_image pi on pi.P_ID = p.P_ID join customer c on c.CTM_ID=p.CTM_ID where pi.PIMG_ISMAINIMG=true"
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
      const [rows, fields] = await pool.query(
        "select p.*, pt.PT_NAME, c.CTM_ID, c.CTM_NAME, pi.PIMG_LINK from pet p join pet_type pt on pt.PT_ID = p.PT_ID join customer c on c.CTM_ID = p.CTM_ID join pet_image pi on pi.P_ID = p.P_ID where p.P_ID=? and pi.PIMG_ISMAINIMG=true",
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
        message: "Lỗi: " + error,
      });
    }
  },

  getImgs: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select pi.P_ID, pi.PIMG_LINK, pi.PIMG_ISMAINIMG from pet p join pet_image pi on pi.P_ID = p.P_ID where p.P_ID=?",
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
        `select *, c.CTM_ID from pet p join pet_type pt on pt.PT_ID = p.PT_ID join pet_image pi on pi.P_ID = p.P_ID join customer c on c.CTM_ID = p.CTM_ID where pi.PIMG_ISMAINIMG=true and (p.P_NAME like '%${s}%' or pt.PT_NAME like '%${s}%' or p.P_SPECIE like '%${s}%')`
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

  getHealthHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from  pet_health where P_ID=?",
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

  // POST
  create: async (req, res) => {
    try {
      const nextId = await getNextId("P_ID", "pet");
      const nextImgId = await getNextId("PIMG_ID", "pet_image");

      const { cusId, petType, name, specie, gender, birthday, img } = req.body;
      const sql =
        "insert into pet values (" +
        nextId +
        "," +
        cusId +
        "," +
        petType +
        ",'" +
        name +
        "','" +
        specie +
        "'," +
        gender +
        ",'" +
        birthday +
        "')";
      const [rows, fields] = await pool.query(sql).then(
        img.forEach(async (i, idx) => {
          let nImgId = nextImgId + idx;
          if (idx == 0) {
            pool.query(
              "insert into pet_image values (" +
                nImgId +
                "," +
                nextId +
                ",'" +
                i +
                "',1)"
            );
          } else {
            pool.query(
              "insert into pet_image values (" +
                nImgId +
                "," +
                nextId +
                ",'" +
                i +
                "',0)"
            );
          }
        })
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

  updateHealth: async (req, res) => {
    try {
      const { id } = req.params;
      const { health, weight } = req.body;
      const timeNow = getNow();
      const [rows, fields] = await pool
        .query("insert into timing values (?)", timeNow)
        .then(
          pool.query("insert into pet_health values (?,?,?,?)", [
            id,
            timeNow,
            weight,
            health,
          ])
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

  // PUT
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { owner, name, type, specie, gender, birth } = req.body;
      const sql = `update pet set CTM_ID=${owner}, P_NAME='${name}', PT_ID=${type}, P_SPECIE='${specie}', P_GENDER=${gender}, P_BIRTHDAY='${birth}' where P_ID=${id}`;
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

module.exports = petsController;
