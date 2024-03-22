const express = require('express')
const router = express.Router()

const petsController = require('../controller/pets.controller')

// GET
router.get("/",petsController.getAll)
router.get("/:id",petsController.getById)
router.get("/:id/mainimg",petsController.getMainImg)
router.get("/:id/imgs",petsController.getImgs)
router.get("/search/:s", petsController.getSearch)
router.get("/health/:id", petsController.getHealthHistory)

// POST
router.post("/", petsController.create)

// PUT
router.put("/:id", petsController.update)

module.exports = router