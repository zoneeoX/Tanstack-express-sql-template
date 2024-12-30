import {
  checkDatabase,
  editTodo,
  getTodo,
  postTodo,
  getSingleTodo,
  deleteTodo,
} from "../controllers/TodoController.js";
import express from "express";

const router = express.Router();

// @ Check database
// GET REQUEST
router.get("/database", checkDatabase);

// @ FETCH DATA
// GET REQUEST
router.get("/", getTodo);
// @ FETCH SINGLE DATA TODO
// GET REQUEST
router.get("/:id", getSingleTodo);

// @ POST DATA TODO
// POST REQUEST
router.post("/create", postTodo);

// @ PUT DATA TODO
// PUT REQUEST
router.put("/edit/:id", editTodo);

// @ DELETE TODO
// DELETE REQUEST
router.delete("/delete/:id", deleteTodo);

export default router;
