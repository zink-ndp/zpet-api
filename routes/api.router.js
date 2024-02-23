const express = require('express')
const router = express.Router()

const customersRouter = require('./customers.router')
const petsRouter = require('./pets.router')
const staffsRouter = require('./staffs.router')

router.use("/customers", customersRouter)

router.use("/pets", petsRouter)

router.use("/staffs", staffsRouter)

module.exports = router