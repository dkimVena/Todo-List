const router = require('express').Router();

const controller = require('./controller');

/**
 * get todo list
 */
router.get('/', controller.getTodos);

/**
 * post todo
 */
router.post('/', controller.postTodo);

/**
 * post todo
 */
router.put('/', controller.editTodo);

/**
 * post todo
 */
router.delete('/:id', controller.deleteTodo);

module.exports = router;
