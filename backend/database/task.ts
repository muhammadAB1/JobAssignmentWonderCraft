import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
export default mongoose.model('Tasks', taskSchema);