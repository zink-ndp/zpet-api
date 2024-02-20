const express = require('express')
const router = express.Router()

const customersController = require('../controller/customers.controller')

// GET
router.get("/", customersController.getAll)
router.get("/:id", customersController.getById)
router.get("/:id/address", customersController.getAddress)
router.get("/:id/pets", customersController.getPets)
router.get("/:id/points", customersController.getPoints)
router.get("/:id/appointments", customersController.getAppointments)

// UPDATE - PUT

// ADD - POST

module.exports = router