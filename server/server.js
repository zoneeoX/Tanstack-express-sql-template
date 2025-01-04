import express from "express";
import { port } from "./src/configs/db.config.js";
import todoRouter from "./src/routes/todos.js";
import authRouter from "./src/routes/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todo", todoRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
