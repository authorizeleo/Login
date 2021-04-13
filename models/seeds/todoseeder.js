const todo = require('../todo')
const  db = require('../../config/mongodb')

db.once('open', ()=>{
    console.log( 'open successful in todoseeder.js')
    for( let i = 1 ; i < 5 ; i++){
        todo.create({name:`name${i}`})
    }
})