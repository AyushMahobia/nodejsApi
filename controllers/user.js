import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";

export const login = async(req, res) => {
    const {email, password} = req.body;

    let user = await User.findOne({email}).select("+password");
    if(!user)
    return res.json({
        success: false,
        message:"Invalid email or password"
    });

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch)
    return res.json({
        success: false,
        message:"Invalid email or password",
    });

    sendCookie(user, res, `Welcome back, ${user.name} ✌`, 201);
}

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});
    if(user)
    return res.status(404).json({
        success: false,
        message: "User Already Exist",
    })

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashPassword,
    });

    sendCookie(user, res, "Registed Successfully", 201);
}

export const getAllUsers = async (req, res) => {}

export const getMyDetail = (req, res) => {
    
    res.status(200).json({
        success: true,
        user: req.user,
    });
}
export const logout = (req, res) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        success: true,
    });
}
