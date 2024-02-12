const { model, Schema } = require("mongoose");
const uuidv4 = require('uuid').v4;
const todoSchema = new Schema({
  todoId: {
    type: String,
    required: true,
    default: uuidv4
  },
  todoName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'done']
  }
},
{
  timestamps: true,
}
);
const Todo = model('todo', todoSchema);
module.exports = Todo;