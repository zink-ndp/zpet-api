const express = require('express')
const router = express.Router()

const analyticContoller = require('../controller/analytic.controller')

router.post("/revenue", analyticContoller.getRevenue)
router.post("/byservices", analyticContoller.getByService)

module.exports = router