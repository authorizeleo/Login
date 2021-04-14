const express = require('express')
const bodyParser = require('body-parser')
const exphdbars = require('express-handlebars')
const MethodOverRide = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongodb')

const app  = express()
const port = process.env.PORT 

app.use("/public", express.static('public')); 

// 為了 渲染 html 的 樣板引擎
app.engine('hbs', exphdbars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// 為了取得 post  資料  的前置作業
app.use(bodyParser.urlencoded({ extended: true }))

// 為了使用put 和 delete
app.use(MethodOverRide('_method'))

// 為了 幫助 http的無狀態性 所以使用 session 來協助
app.use(session({
    secret: process.env.SESSION_SECRET,
    // 當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
    resave: false, 
    /// 強制將未初始化的 session 存回 session store。
    //  未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
    saveUninitialized:true   
}))

// 呼叫passport 函式 並傳入 app
usePassport(app)

// 掛載 套件
app.use(flash()) 

// 設定本地變數 res.locals
app.use((req, res, next) => {
    // console.log(req.user) 
    // res.locals 是 Express.js 幫我們開的一條捷徑, 
    // 放在 res.locals 裡的資料,所有的view都可以存取
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user 
    // req.user 是從 反序列化的時候 , 取出的 user資訊 , 之後會放在req.user裡 以供後續使用
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})
app.use(routes)


app.listen(port, ()=>{
    console.log('successful http://localhost:'+ port)
})

