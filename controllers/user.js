import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        //next goes to errorMiddleware and I created my own error handler
        if (!user) return next(new ErrorHandler("Invalid email or password", 404));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 404));

        sendCookie(user, res, `Welcome back, ${user.name} ✌`, 201);
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        //next goes to errorMiddleware and I created my own error handler
        if (user) return next(new ErrorHandler("User Already Exist", 400));

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        sendCookie(user, res, "Registed Successfully", 201);
    } catch (error) {
        next(error)
    }
}


export const getMyDetail = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
}

export const logout = (req, res) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
    });
}
