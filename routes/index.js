// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const shortenerRoute = require('./modules/shortenerRoute')
router.use('/', home)
router.use('/', shortenerRoute)


module.exports = router