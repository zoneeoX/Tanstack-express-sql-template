import express from "express";
import {
  getUser,
  login,
  register,
  isAuth,
  amIManager,
  amIAdmin,
} from "../controllers/AuthController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/login", getUser);
router.get("/", verifyJWT, isAuth); //isauth
router.get("/admin", verifyJWT, verifyRoles(["admin"]), amIAdmin);
router.get("/manager", verifyJWT, verifyRoles(["manager", "admin"]), amIManager);

export default router;
