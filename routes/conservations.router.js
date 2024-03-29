const express = require('express')
const router = express.Router()

const conservationsController = require('../controller/conservations.controller')

// GET
router.get('/list/:id', conservationsController.getList)
router.get('/chat/:sId&:cId', conservationsController.getChat)

// POST
router.post('/chat/:sId&:cId', conservationsController.postChat)


module.exports = router 