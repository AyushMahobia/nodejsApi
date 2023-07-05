import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "backendapi"
    }).then(() => console.log("Database is connected")).catch(e => console.log(e));
}

