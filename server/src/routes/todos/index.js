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

module.exports = router;
