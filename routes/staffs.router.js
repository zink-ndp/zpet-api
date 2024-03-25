const express = require('express')
const router = express.Router()

const staffsController = require('../controller/staffs.controller')

// GET
router.get("/",staffsController.getAll)
router.get("/:id",staffsController.getById)
router.get("/:id/invoices",staffsController.getInvoice)
router.get("/search/:s",staffsController.getSearch)
router.get("/rolelist/:isAd",staffsController.getRoleList)
router.get("/statuslist/:isWk",staffsController.getStatusList)

// POST
router.post("/login",staffsController.login)

// PUT
router.put("/:id", staffsController.update)

module.exports = router