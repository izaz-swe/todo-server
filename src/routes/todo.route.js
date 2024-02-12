const { Router } = require("express");
const { authenticate } = require("../middleware/authenticate");
const { addTodo, getTodos, updateTodo, removeTodo } = require("../controllers/todo.controller");


const router = Router();
router.post('/create', authenticate, addTodo);
router.get('/all', authenticate, getTodos);
router.put('/update', authenticate, updateTodo);
router.delete('/:todoId', authenticate, removeTodo);
module.exports = router;