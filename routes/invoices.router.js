const express = require('express')
const router = express.Router()

const invoicesController = require('../controller/invoices.controller')

// GET

router.get("/",invoicesController.getAll)
router.get("/shipfee/:dist",invoicesController.getShipFee)

// PUT

// POST

module.exports = router