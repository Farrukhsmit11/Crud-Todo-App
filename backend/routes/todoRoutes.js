import express from "express"
import { Todo } from "../models/Todo.js";
const router = express.Router();
import { addTodos, getTodo, deleteTodos, editTodos } from "../controllers/todoController.js"

router.route("/todos").get(getTodo)
router.route("/add-todos").post(addTodos)
router.route("/delete-todos").delete(deleteTodos)
router.route("/edit-todos/:id").patch(editTodos)

export default router