const router = require('express').Router()
const { GetAll_todo, Get_todo, Add_todo, Update_todo, Delete_todo } = require('../controllers/todo')

router.get('/', GetAll_todo)
router.get('/:id', Get_todo)
router.post('/', Add_todo)
router.put('/', Update_todo)
router.delete('/:id', Delete_todo)

module.exports = router