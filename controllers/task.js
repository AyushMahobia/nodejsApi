import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title, description,
            user: req.user,
        })
        res.json({
            success: true,
            message: "New Task Added Successfully",
        })
    } catch (error) {
        next(error)
    }

};

export const getMytasks = async (req, res, next) => {
    try {
        const task = await Task.find({ user: req.user._id });

        //next goes to errorMiddleware and I created my own error handler
        if (!task) return next(new ErrorHandler("Add Task First", 404));

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error)
    }

};

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        //next goes to errorMiddleware and I created my own error handler
        if (!task) return next(new ErrorHandler("Task Not found", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        });
    } catch (error) {
        next(error)
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        //next goes to errorMiddleware and I created my own error handler
        if (!task) return next(new ErrorHandler("Task Not found", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        });
    } catch (error) {
        next(error)
    }
};