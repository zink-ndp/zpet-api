const pool = require('../db/index')

const staffsController = {

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from staff")
            res.json({
                data: rows,
                message: "OK"
            })
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },

    getById: async (req, res) => {
        try {
            const {id} = req.params
            const [rows, fields] = await pool.query("select * from staff where STF_ID=?",[id])
            res.json({
                data: rows,
                message: "OK"
            })
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },

    getLoginInfo: async (req, res) => {
        try {
            const { email, pw, role } = req.params
            const [rows, fields] = await pool.query("select * from staff where STF_EMAIL=? and STF_PASSWORD=? and STF_ISMANAGER=?",[email,pw, role])
           
            if (rows.length > 0) {
                res.json({
                    data: rows,
                    message: "OK"
                })
            } else {
                res.json({
                    data: [],
                    message: "Thông tin đăng nhập không đúng"
                })
            }
            
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },

    getSearch : async (req, res) => {
        try {
            const { s } = req.params
            const [rows, fields] = await pool.query(`select * from staff where STF_ID like '%${s}%' or STF_EMAIL like '%${s}%' or STF_NAME like '%${s}%' or STF_PHONE like '%${s}%'`)
            res.json({
                data: rows,
                message: "OK"
            })
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },

    getRoleList: async (req, res) => {
        try {
            const { isAd } = req.params
            const [rows, fields] = await pool.query("select * from staff where STF_ISMANAGER=?",[isAd])
            res.json({
                data: rows,
                message: "OK"
            })
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },

    getStatusList: async (req, res) => {
        try {
            const { isWk } = req.params
            const [rows, fields] = await pool.query("select * from staff where STF_ISWORKING=?",[isWk])
            res.json({
                data: rows,
                message: "OK"
            })
            
        } catch (error) {
            res.json({
                message: "Lỗi: "+error,
              });
        }
    },


}

module.exports = staffsController