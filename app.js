import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backendapi"
}).then(() => console.log("Database is connected")).catch(e => console.log(e));

const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", schema);

const app = express(); // creating server

//Using Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Nice working")
})

app.get("/users/all", async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    })
})

app.post("/user/new", async (req, res) => {
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
})

app.get("/userId/special", async (req, res) => {

    res.json({
        success: true,
        message:"Just joking",
    })
})
//Both above and below url is same so try to use dynamic url at last
 
app.get("/userId/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        user,
    })
})

app.listen(5000, () => {
    console.log("Server is  running")
})