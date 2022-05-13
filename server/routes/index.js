var express = require('express')
var router = express.Router()

const todoController = require('../controllers/todo.controller')
const tasksController = require('../controllers/tasks.controller')

// Todo's routes
router.post('/todo/create', todoController.create)
router.get('/todo/get-todos', todoController.getAll)
router.delete('/todo/delete-todo', todoController.delete)

// Task's routes
router.get('/tasks/get-tasks/:todoName', tasksController.getAll)
router.post('/task/create', tasksController.create)
router.put('/task/update', tasksController.update)
router.delete('/task/delete', tasksController.delete)

module.exports = router
