const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const tofunction = require('./modules/tofunction')
const login = require('./modules/login')
const { authenticator } = require('../middleware/auth')



router.use('/todo', authenticator, tofunction)
router.use('/user', login)
// 為了 不被驗證擋下 所以 放在最下面
router.use('/', authenticator, home)

module.exports = router