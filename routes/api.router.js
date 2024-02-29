const express = require('express')
const router = express.Router()

const customersRouter = require('./customers.router')
const petsRouter = require('./pets.router')
const staffsRouter = require('./staffs.router')
const servicesRouter = require('./services.router')
const vouchersRouter = require('./vouchers.router')
const appointmentRouter = require('./appointments.router')

router.use("/customers", customersRouter)

router.use("/pets", petsRouter)

router.use("/staffs", staffsRouter)

router.use('/services',servicesRouter)

router.use('/vouchers', vouchersRouter)

router.use('/appointments', appointmentRouter)

module.exports = router