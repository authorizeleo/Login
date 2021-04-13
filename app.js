const express = require('express')
const mongoose = require('mongoose')
const exphdbars = require('express-handlebars')
const todo = require('./models/todo')
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

app.engine('hbs', exphdbars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    todo.find()
    .lean()
    .then( todos => res.render('index' , { todos }))
    .catch( error => console.error(error))
})


app.listen(port, ()=>{
    console.log('successful http://127.0.0.1:'+ port)
})

