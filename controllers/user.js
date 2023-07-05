import { User } from "../models/user.js";

export const allUserDetails = async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        users,
    })
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name, email, password
        })
        res.status(201).json({ //201 for created
            success: true,
            messages: "Register successfuly"
        })
    } catch (error) {
        console.log(error)
    }
}

export const special = async (req, res) => {

    res.json({
        success: true,
        message:"Just joking",
    })
}

export const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        user,
    })
}
