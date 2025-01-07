import express from "express";
import { getUser, login, register, isAuth } from "../controllers/AuthController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/login", getUser)
router.get("/", verifyJWT ,isAuth)

export default router;
