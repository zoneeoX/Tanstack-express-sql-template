import express from "express";
import { port } from "./src/configs/db.config.js";
import router from "./src/routes/todos.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todo", router);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
