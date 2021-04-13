const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphdbars = require('express-handlebars')
const MethodOverRide = require('method-override')
const Todo = require('./models/todo')
const app  = express()
const port = 3000

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

// 為了 渲染 html 的 樣板引擎
app.engine('hbs', exphdbars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// 為了取得 post  資料  的前置作業
app.use(bodyParser.urlencoded({ extended: true }))

// 為了使用put 和 delete
app.use(MethodOverRide('_method'))

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

app.put('/edit/:id', (req, res) => {
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


app.delete('/del/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .then((todo) => todo.remove())
        .then(() => res.redirect('/') )
        .catch((err) => console.error(err))
})



app.listen(port, ()=>{
    console.log('successful http://127.0.0.1:'+ port)
})

