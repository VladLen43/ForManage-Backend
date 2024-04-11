import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: mongoose.Schema.Types.Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
        imageUrl: {
            type: String,
        }
    },
        {
        timestamps: true,
        },
);

export default mongoose.model('Todo', TodoSchema)