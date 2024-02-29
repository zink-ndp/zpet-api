const express = require('express')
const servicesController = require('../controller/services.controller')
const router = express.Router()

router.get("/", servicesController.getAll)
router.get("/:id", servicesController.getById)
router.get("/search/:s", servicesController.getSearch)
router.get("/price/:from&:to", servicesController.getByPrice)


module.exports = router