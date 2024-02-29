const pool = require('../db/index')

const vouchersController = {

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from voucher")
            res.json({
                data: rows,
                message: "OK"
            })
        } catch (error) {
            res.json(
                message(error)
            )
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from voucher where VOU_ID = ?",[id])
            res.json({
                data: rows,
                message: "OK"
            })
        } catch (error) {
            res.json(
                message(error)
            )
        }
    },

    getSearch: async (req, res) => {
        try {
            const { s } = req.params
            const [rows, fields] = await pool.query(`select * from voucher where VOU_ID like '%${s}%' or VOU_NAME like '%${s}%' or VOU_PERCENT like '%${s}%'`)
            res.json({
                data: rows,
                message: "OK"
            })
        } catch (error) {
            res.json(
                message(error)
            )
        }
    },


}

module.exports = vouchersController