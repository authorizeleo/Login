const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/login'
}))

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', (req, res)=>{
    const { name , email , password, confirmPassword } = req.body
    User.findOne({ email })
        .then( user => {
            if( user ){
                res.render('register',{
                    name,
                    email,
                    password,
                    confirmPassword
                })
                console.log('已有人註冊')
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
    res.redirect('/user/login')
})

module.exports = router