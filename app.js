const express = require('express')
const bodyParser = require('body-parser')
const exphdbars = require('express-handlebars')
const MethodOverRide = require('method-override')

const routes = require('./routes')
require('./config/mongodb')

const app  = express()
const port = process.env.PORT || 3000



// 為了 渲染 html 的 樣板引擎
app.engine('hbs', exphdbars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// 為了取得 post  資料  的前置作業
app.use(bodyParser.urlencoded({ extended: true }))

// 為了使用put 和 delete
app.use(MethodOverRide('_method'))

app.use(routes)


app.listen(port, ()=>{
    console.log('successful http://localhost:'+ port)
})

