const fs = require('fs')

module.exports = {
  async create (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []
    const checkIfTodoExist = todos.filter(
      element => element.todoName == req.body.todoName
    )

    if (checkIfTodoExist.length) {
      res.send({ success: false, msg: 'Todo with the same name alerady exist' })
    } else {
      todos.push(req.body)
      fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
      res.send({ success: true, msg: 'Todo added successfully' })
    }
  },

  async getAll (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []

    let tasks = fs.readFileSync('./data/tasks.json')
    tasks = tasks.length ? JSON.parse(tasks) : []

    todos.forEach((element, index) => {
      let todoCompletedTasks = []
      tasks.filter(item => {
        if (item.todoName == element.todoName && item.completed) {
          todoCompletedTasks.push(item)
        }
      })

      let todoTotalTasks = []
      tasks.filter(item => {
        if (item.todoName == element.todoName) {
          todoTotalTasks.push(item)
        }
      })
      todos[index].completedTasks = todoCompletedTasks
      todos[index].todoTotalTasks = todoTotalTasks
    })

    res.send({ success: true, data: todos })
  },

  async delete (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []

    let tasks = fs.readFileSync('./data/tasks.json')
    tasks = tasks.length ? JSON.parse(tasks) : []

    // Remove all tasks from task.json for the given todo
    const filteredTasks = tasks.filter(
      element => element.todoName != req.body.todoName
    )
    fs.writeFileSync('./data/tasks.json', JSON.stringify(filteredTasks))

    // Remove todo from the json
    const filteredTodos = todos.filter(
      element => element.todoName != req.body.todoName
    )
    fs.writeFileSync('./data/todos.json', JSON.stringify(filteredTodos))
    res.send({ success: true, msg: 'Todo deleted successfully' })
  }
}
