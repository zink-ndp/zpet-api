const express = require('express')
const router = express.Router()

const customersRouter = require('./customers.router')

router.use("/customers", customersRouter)

module.exports = router