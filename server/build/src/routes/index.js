const router = require('express').Router();

const todos = require('./todos');

router.use('/todos', todos);

module.exports = router;