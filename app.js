const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphdbars = require('express-handlebars')
const Todo = require('./models/todo')
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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    Todo.find()
    .lean()
    .then( todos => res.render('index' , { todos }))
    .catch( error => console.error(error))
})

app.get('/create/new', (req, res) => {
    res.render('input')
})

app.post('/input', (req, res)=>{
    const name = req.body.name
    // const newname = new Todo({name})

    // return newname.save()
    // .then(() => res.redirect('/'))
    // .catch((error)=> console.log('error'))
    return Todo.create({name})
        .then(() => res.redirect('/'))
        .catch(() => console.log("error"))
})


app.listen(port, ()=>{
    console.log('successful http://127.0.0.1:'+ port)
})

