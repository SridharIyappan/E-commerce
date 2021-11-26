import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        productID: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        disLikes: {
            type: Number,
            default: 0,
        }
    }
);

export const Comments = mongoose.model('comments', commentSchema);