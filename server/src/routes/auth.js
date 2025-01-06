import express from "express";
import { getUser, login, register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/login", getUser)

export default router;
