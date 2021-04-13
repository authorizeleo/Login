const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/todo-list'

// 連線 mongodb
mongoose.connect(MONGODB_URL, {useNewUrlParser: true , useUnifiedTopology: true})

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