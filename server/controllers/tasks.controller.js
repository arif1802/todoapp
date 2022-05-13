const fs = require('fs')

module.exports = {
  async create (req, res) {
    let tasks = fs.readFileSync('./data/tasks.json')
    tasks = tasks.length ? JSON.parse(tasks) : []
    const task = tasks.filter(
      element => element.description == req.body.description
    )

    if (task.length) {
      res.send({
        success: false,
        msg: `Task with the same name alerady exist in ${task[0].todoName}`
      })
    } else {
      tasks.push(req.body)
      fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks))
      res.send({ success: true, msg: 'Task added successfully' })
    }
  },

  async update (req, res) {
    let tasks = fs.readFileSync('./data/tasks.json')
    tasks = tasks.length ? JSON.parse(tasks) : []
    const index = tasks.findIndex(
      element => element.description == req.body.description
    )

    const oldIndex = tasks.findIndex(
      element => element.description == req.body.oldDescription
    )

    if (index !== -1 && req.body.description !== req.body.oldDescription) {
      res.send({
        success: false,
        msg: `Task with the same name alerady exist in ${tasks[index].todoName}`
      })
    } else {
      delete req.body.oldDescription
      tasks[oldIndex] = req.body
      fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks))
      res.send({ success: true, msg: 'Task updated successfully' })
    }
  },

  async getAll (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []
    const todo = todos.filter(
      element => element.todoName == req.params.todoName
    )
    if (!todo.length) {
      res.send({ success: false, msg: 'No such todo found' })
    } else {
      let tasks = fs.readFileSync('./data/tasks.json')
      tasks = tasks.length ? JSON.parse(tasks) : []
      tasks = tasks.filter(element => element.todoName == req.params.todoName)
      res.send({
        success: true,
        data: tasks
      })
    }
  },

  async delete (req, res) {
    let tasks = fs.readFileSync('./data/tasks.json')
    tasks = tasks.length ? JSON.parse(tasks) : []
    const filteredTasks = tasks.filter(
      element => element.description != req.body.taskName
    )
    fs.writeFileSync('./data/tasks.json', JSON.stringify(filteredTasks))
    res.send({ success: true, msg: 'Task deleted successfully' })
  }
}
