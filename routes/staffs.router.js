const express = require('express')
const router = express.Router()

const staffsController = require('../controller/staffs.controller')

// GET
router.get("/",staffsController.getAll)
router.get("/:id",staffsController.getById)
router.get("/login/:email&:pw&:role",staffsController.getLoginInfo)
router.get("/search/:s",staffsController.getSearch)
router.get("/rolelist/:isAd",staffsController.getRoleList)
router.get("/statuslist/:isWk",staffsController.getStatusList)

module.exports = router