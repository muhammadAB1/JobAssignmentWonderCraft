import mongoose from "mongoose";


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log(e))

export const db = {
    Student,
    Teacher,
    Admin,
    User,
    Darja,
    Date,
    Subject,
    Courses,
    Event,
    Marks,
    Timetable,
    Chat
}