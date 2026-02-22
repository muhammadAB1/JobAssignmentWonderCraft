import mongoose from "mongoose";
import task from "./task";



mongoose.connect(process.env.MONGODB_URL!)
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log(e))

export const db = {
    task
}