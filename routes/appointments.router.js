const express = require('express')
const router = express.Router()

const appointmentController = require('../controller/appointment.controller')

// GET
router.get("/", appointmentController.getAll)
router.get("/:id", appointmentController.getById)
router.get("/customer/:id", appointmentController.getByCusId)
router.get("/status/:stt", appointmentController.getByStt)
router.get("/services/:id", appointmentController.getSrvById)
router.get("/status/list/:id", appointmentController.getSttById)

// UPDATE
router.put("/status/:id", appointmentController.updateStatus)

// POST
router.post("/", appointmentController.create)

module.exports = router