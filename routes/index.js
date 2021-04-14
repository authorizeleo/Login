const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const tofunction = require('./modules/tofunction')
const login = require('./modules/login')


router.use('/', home)
router.use('/todo', tofunction)
router.use('/login', login)

module.exports = router