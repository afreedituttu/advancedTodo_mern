const Todo = require('../models/todo');

const userTodoDelete = (userId) => {
    return Todo.deleteMany({userId})
}

module.exports = {
    userTodoDelete
}