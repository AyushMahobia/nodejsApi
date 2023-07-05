import express from "express"
import { getAllUsers, register, login, getMyDetail, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers)

router.get("/me", isAuthenticated, getMyDetail)
//route is use when there is different method with same url

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)

export default router;