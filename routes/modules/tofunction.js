const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/create/new', (req, res) => {
    res.render('input')
})

router.post('/input', (req, res)=>{
    const userId = req.user._id
    const name = req.body.name
    // const newname = new Todo({name})

    // return newname.save()
    // .then(() => res.redirect('/'))
    // .catch((error)=> console.log('error'))
    return Todo.create({name , userId })
        .then(() => res.redirect('/'))
        .catch(() => console.log("error"))
})

router.get('/detail/:id', (req, res)=> {
    const userId = req.user._id
    const id = req.params.id
    return Todo.findOne({id, userId})
        .lean()
        .then(( todo ) => res.render('detail', { todo }))
        .catch((err) => console.error(err))
})

router.get('/edit/:id', (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    return Todo.findByOne({ id, userId})
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch((err) => console.error(err))
})

router.put('/edit/:id', (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const { name, status } = req.body
    return Todo.findByOne({id , userId})
        .then((todo)=>{
            todo.name = name
            todo.status = status === 'on'
            return todo.save()
        })
        .then(()=> res.redirect(`/todo/detail/${id}`))
        .catch((err)=>{
            console.log(err)
        })
})


router.delete('/del/:id', (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    return Todo.findByOne({id, userId})
        .then((todo) => todo.remove())
        .then(() => res.redirect('/') )
        .catch((err) => console.error(err))
})

module.exports = router