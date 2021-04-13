const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TodoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Todo', TodoSchema)