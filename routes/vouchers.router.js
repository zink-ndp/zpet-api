const express = require('express')
const router = express.Router()

const vouchersController = require('../controller/vouchers.controller')

router.get('/',vouchersController.getAll)
router.get('/:id',vouchersController.getById)
router.get('/search/:s',vouchersController.getSearch)

module.exports = router