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
    },
    userId:{
        // type  和 ref 這兩個設定是一起的 :
        // type: 定義 userId 這個項目是一個ObjectId, 也就是它會連向另一個資料物件 
        // ref :  定義 參考對象是 User model
        type:Schema.Types.ObjectId,
        ref: 'User',
        // 資料索引 index :
        // 這裡可以用 index: true 把 userId 設定成「索引」，
        // 當我們常常用某個欄位來查找資料時，可以考慮把欄位設成索引，
        // 使用索引來查詢資料能夠增加讀取效能。
        index:true,
        require:true
    }
})

module.exports = mongoose.model('Todo', TodoSchema)