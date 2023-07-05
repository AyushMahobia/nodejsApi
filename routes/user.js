import express from "express"
import { allUserDetails, createUser, findUserById, special } from "../controllers/user.js";

const router = express.Router();

router.get("/all", allUserDetails)

router.post("/new", createUser)

router.get("/userId/special", special)
//Both above and below url is same so try to use dynamic url at last
router.get("/userId/:id", findUserById)

export default router;