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
    .sort({ name:'asc' })  // desc 由大到小
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

app.get('/detail/:id', (req, res)=> {
   const id = req.params.id
   return Todo.findById(id)
    .lean()
    .then(( todo ) => res.render('detail', { todo }))
    .catch((err) => console.error(err))
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch((err) => console.error(err))
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id
    const { name, status } = req.body
    return Todo.findById(id)
        .then((todo)=>{
            todo.name = name
            todo.status = status === 'on'
            return todo.save()
        })
        .then(()=> res.redirect(`/detail/${id}`))
        .catch((err)=>{
            console.log(err)
        })
})


app.post('/del/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .then((todo) => todo.remove())
        .then(() => res.redirect('/') )
        .catch((err) => console.error(err))
})



app.listen(port, ()=>{
    console.log('successful http://127.0.0.1:'+ port)
})

