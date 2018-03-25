const mongoose = require('mongoose');
const Todo = require('../../db/models/todo');


module.exports.getTodos = async (req, res) => {
    Todo
    .find()
    .sort({
      checked: -1
    })
    .exec((error, todos) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Could not retrieve todo list'
        });
      }
      res.json(todos);
    });
};

module.exports.postTodo = async (req, res) => {
    console.log(req.body);
    const { body } = req;
    const { content } = body;
  
    if (!content) {
      return res.status(400).json({
        message: 'Error title and content are all required!'
      });
    }

    Todo.create(req.body, (err, todoResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not save todo'
        });
      }
      res.json(todoResult);
    });
};