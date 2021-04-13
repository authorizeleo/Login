const mongoose = require('mongoose')
// 連線 mongodb
mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser: true , useUnifiedTopology: true})

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