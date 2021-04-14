const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
    const errors = req.flash('error')[0]
    // console.log(errors)
    res.render('login', { errors })
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', (req, res)=>{
    const { name , email , password, confirmPassword } = req.body
    const errors  = []
    if( !name || !email || !password || !confirmPassword){
        errors.push({ message: '所有欄位都是必填' })
    }
    if (password !== confirmPassword){
        errors.push({ message: '密碼與確認密碼必須一致' })
    }
    if (errors.length){
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    User.findOne({ email })
        .then( user => {
            if( user ){
                errors.push({ message:'此信箱已有人註冊' })
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword
                })
            }
            return bcrypt
                .genSalt(10) // 產生鹽, 並設定複雜度係數為 10
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash, // 用雜湊值取代原本的使用者
                }))
                .then(() => res.redirect('/user/login'))
                .catch((err) => console.log(err))
        })
})


router.get('/logout', (req, res)=>{
    req.logOut()
    req.flash('success_msg', '你已經成功登出')
    res.redirect('/user/login')
})

module.exports = router