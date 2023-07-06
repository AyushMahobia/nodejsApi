import express from "express"
import { deleteTask, getMytasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated, newTask)

router.get("/my",isAuthenticated, getMytasks)

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);
//route is use when there is different method with same url

export default router;
