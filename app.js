const express = require('express')
const mongoose = require('mongoose')
const app  = express()
const port = 3000

mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser: true , useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
    console.log('error notice')
})

db.once('open', () => {
    console.log('good connected')
})


app.get('/', (req, res) => {
    res.send('test1')
})


app.listen(port, ()=>{
    console.log('first')
})

