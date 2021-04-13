const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const tofunction = require('./modules/tofunction')

router.use('/', home)
router.use('/todo', tofunction)

module.exports = router