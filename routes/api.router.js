const express = require('express')
const router = express.Router()

const customersRouter = require('./customers.router')
const petsRouter = require('./pets.router')
const staffsRouter = require('./staffs.router')
const servicesRouter = require('./services.router')
const vouchersRouter = require('./vouchers.router')
const appointmentRouter = require('./appointments.router')
const invoicesRouter = require('./invoices.router')
const analyticRouter = require('./analytic.router')
const conservationsRouter = require('./conservations.router')

router.use("/customers", customersRouter)

router.use("/pets", petsRouter)

router.use("/staffs", staffsRouter)

router.use('/services',servicesRouter)

router.use('/vouchers', vouchersRouter)

router.use('/appointments', appointmentRouter)

router.use('/invoices', invoicesRouter)

router.use('/analytics', analyticRouter)

router.use('/conservations', conservationsRouter)

module.exports = router