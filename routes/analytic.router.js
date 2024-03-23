const express = require('express')
const router = express.Router()

const analyticContoller = require('../controller/analytic.controller')

router.post("/revenue", analyticContoller.getRevenue)

module.exports = router