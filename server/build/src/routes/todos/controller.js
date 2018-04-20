const mongoose = require('mongoose');
const Todo = require('../../db/models/todo');

module.exports.getTodos = async (req, res) => {
  Todo.find().sort('checked').exec((error, todos) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Could not retrieve todo list'
      });
    }
    res.json(todos.data);
  });
};

module.exports.postTodo = async (req, res) => {
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

/* EDIT TODO */
module.exports.editTodo = async (req, res) => {
  const { body } = req;

  Todo.findOneAndUpdate({ _id: body._id }, req.body, (err, todo) => {
    if (err) {
      throw err;
    }
    res.json(todo);
  });
};

/* DELETE TODO */
module.exports.deleteTodo = async (req, res) => {

  // CHECK MEMO ID VALIDITY
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  // FIND MEMO AND CHECK FOR WRITER
  Todo.findById(req.params.id, (err, todo) => {
    if (err) throw err;

    if (!todo) {
      return res.status(404).json({
        error: "NO RESOURCE",
        code: 3
      });
    }
    // if(memo.writer != req.session.loginInfo.username) {
    //     return res.status(403).json({
    //         error: "PERMISSION FAILURE",
    //         code: 4
    //     });
    // } 

    // REMOVE THE MEMO
    Todo.remove({ _id: req.params.id }, err => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
};