const express = require('express')
const bodyParser = require('body-parser')
const exphdbars = require('express-handlebars')
const MethodOverRide = require('method-override')
const session = require('express-session')

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongodb')

const app  = express()
const port = process.env.PORT || 3000

// 呼叫passport 函式 並傳入 app

usePassport(app)

// 為了 渲染 html 的 樣板引擎
app.engine('hbs', exphdbars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// 為了取得 post  資料  的前置作業
app.use(bodyParser.urlencoded({ extended: true }))

// 為了使用put 和 delete
app.use(MethodOverRide('_method'))

// 為了 幫助 http的無狀態性 所以使用 session 來協助
app.use(session({
    secret:'ThisIsMySecret',
    // 當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
    resave: false, 
    /// 強制將未初始化的 session 存回 session store。
    //  未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
    saveUninitialized:true   
}))


app.use(routes)


app.listen(port, ()=>{
    console.log('successful http://localhost:'+ port)
})

