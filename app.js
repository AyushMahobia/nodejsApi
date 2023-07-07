import express from "express";
import userRouter from "./routes/user.js"
import userTask from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express(); // creating server

config({
    path:"./data/config.env"
})

//Using Middleware
app.use(express.json());
app.use(cookieParser());
//Using routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', userTask)


app.get("/", (req, res) => {
    res.send("Nice working")
})

//using eror middleware
app.use(errorMiddleware)

