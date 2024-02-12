const TodoSchema = require('../schema/todoSchema');
const createTodo = async (todo) => {
  const createdTodo = await TodoSchema.create(todo);
  return createdTodo;
};
const getAllTodo = async (userId) => {
  const todos = await TodoSchema.find({userId});
  return todos;
};
const deleteTodo = async (todoId) => {
  await TodoSchema.findOneAndDelete(todoId);
  return todoId;
};
const updateTodo = async (todoId, updateValue) => {
  const updatedTodo = await TodoSchema.findOneAndUpdate({todoId}, updateValue, {new: true});
  return updatedTodo;
};
module.exports = {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodo
}