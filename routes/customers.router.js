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


// ADD - POST
router.post("/", customersController.create)
router.post("/:id/address", customersController.addAddress)
router.post("/checkPhone", customersController.checkPhone)
router.post("/login", customersController.login)

// UPDATE - PUT
router.put("/:id", customersController.update)

module.exports = router