const express = require('express')
const router = express.Router()

const analyticContoller = require('../controller/analytic.controller')

router.post("/revenue", analyticContoller.getRevenue)
router.post("/byservices", analyticContoller.getByService)
router.post("/bypettypes", analyticContoller.getByPetType)

module.exports = router