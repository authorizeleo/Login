const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

// 連線 mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
// 如果錯誤
db.on('error', () => {
    console.log('error notice')
})

// 如果成功
db.once('open', () => {
    console.log('good connected')
})

module.exports = db