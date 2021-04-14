const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
    // 初始化 Passport 模組
    app.use(passport.initialize())
    app.use(passport.session())

    // 設定本地登入策略
    passport.use(new LocalStrategy({ usernameField:'email' }, ( email, password, done ) => {
        User.findOne({ email })
            .then( (user) => {
                if(!user){
                    return done(null, false, { message : 'That email is not registered!'})
                }
                if( user.password !== password ){
                    return done(null, false, { message: 'That password is wrong'})
                }
                return done(null, user)
            })
            .catch(err => done(err, false))
    }))

    // 設定序列化 與 反序列化
    // 序列化: 從資料庫完整地找到 user 的物件, 把user.id 存入 session
    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

    // 反序列化: 根據 session 裡的 user.id 從資料庫查找完整　user 物件
    passport.deserializeUser((id, done) => {
        User.findById(id)
        .lean()
        .then( user => done(null, user))
        .catch( err => done(err, null))
    })

}