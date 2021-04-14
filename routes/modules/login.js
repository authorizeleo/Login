const express = require('express')
const passport = require('passport')
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
            }else{
                return User.create({
                    name,
                    email,
                    password,
                }).then(() => {
                    res.redirect('/user/login')
                    console.log('完成註冊')
                }).catch((err) => console.log(err))

            }
        })
})


router.get('/logout', (req, res)=>{
    req.logOut()
    req.flash('success_msg', '你已經成功登出')
    res.redirect('/user/login')
})

module.exports = router