const mongoose = require('mongoose');

const { Schema } = mongoose;

const Todo = new Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    checked: { type: Boolean, default: false },
    color: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('todo', Todo);
