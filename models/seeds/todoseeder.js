const bcrypt = require('bcryptjs')
// 如果執行環境 真的是在 production mode 上 ,
// 那麼就會用別的方法設定環境變數
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const todo = require('../todo')
const User = require('../user')
const  db = require('../../config/mongodb')



const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
}


db.once('open', ()=>{
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt) )
        .then(hash => User.create({
            name:SEED_USER.name,
            email:SEED_USER.email,
            password:hash
        }))
        .then(user => {
            const userId = user._id
            return Promise.all(Array.from({ length:10 },
                (_,i)=> todo.create({name:`name${i}`, userId})))
        })
        .then(() => {
            console.log( 'open successful in todoSeeder.js')
            process.exit()
        })
    
   
})