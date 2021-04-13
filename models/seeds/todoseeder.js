const mongoose = require('mongoose')
const todo = require('../todo')

mongoose.connect('mongodb://localhost/todo-list',{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('error mongodb connecting in todoseeder')
})

db.once('open', ()=>{
    console.log( 'open successful in todoseeder.js')

    for(let i = 0 ; i < 6 ; i++ ){
        todo.create({ name: `new${i}`})
    } 
})