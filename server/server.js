import express from "express";
import { port } from "./src/configs/db.config.js";
import todoRouter from "./src/routes/todos.js";
import authRouter from "./src/routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "zone", // replace this pake di env nanti
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

app.use("/api/todo", todoRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
