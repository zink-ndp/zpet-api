const express = require('express')
const servicesController = require('../controller/services.controller')
const router = express.Router()

// GET
router.get("/", servicesController.getAll)
router.get("/:id", servicesController.getById)
router.get("/:id/rates", servicesController.getRate)
router.get("/search/:s", servicesController.getSearch)
router.get("/price/:from&:to", servicesController.getByPrice)

//PUT
router.put("/:id", servicesController.update)

module.exports = router