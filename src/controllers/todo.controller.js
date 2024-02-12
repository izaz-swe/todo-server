const { errorResponseHandler } = require('../helper/errorResponseHandler');
const todoModel = require('../models/Todo');
const getTodos = async (req, res) => {
  try {
    const {userId} = req.user;
    const todos = await todoModel.getAllTodo(userId);
    res.success(todos, "All Todo Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const addTodo = async (req, res) => {
  try {
    const {todoName, status} = req.body;
    const {userId} = req.user;
    const todo = await todoModel.createTodo({todoName, status, userId});
    res.success(todo, "Todo Created Successfully");
  } catch (error) {
    errorResponseHandler(error, req, res);
  }
};

const updateTodo = async (req, res) => {
  try {
    const {todoId, todoName, status} = req.body;
    const updatedTodo = await todoModel.updateTodo(todoId, {todoName, status});
    res.success(updatedTodo, "Todo Updated Successfully."); 
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const removeTodo = async (req, res) => {
  try {
    const {todoId} = req.params;
    await todoModel.deleteTodo(todoId);
    res.success(todoId, "Delete Successful");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  getTodos,
  updateTodo,
  removeTodo,
  addTodo
}