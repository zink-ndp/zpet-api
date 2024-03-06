const express = require('express')
const router = express.Router()

const customersController = require('../controller/customers.controller')

// GET
router.get("/", customersController.getAll)
router.get("/search/:s", customersController.getSearch)
router.get("/:id", customersController.getById)
router.get("/info/:phone", customersController.getByPhone)
router.get("/:id/address", customersController.getAddress)
router.get("/:id/pets", customersController.getPets)
router.get("/:id/points", customersController.getPoints)
router.get("/:id/appointments", customersController.getAppointments)
router.get("/:id/invoices", customersController.getInvoices)

// UPDATE - PUT

// ADD - POST
router.post("/:id/address", customersController.addAddress)


module.exports = router