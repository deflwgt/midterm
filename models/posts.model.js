import mongoose from "mongoose"
import { COLLECTIONS } from "../utils/collections.js"

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: Boolean,
        default: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },

})

const PostModel = new mongoose.model(COLLECTIONS.POSTS, postSchema)

export const createPost = (data) => {
    return PostModel.create(data)
}

export const getPost = (data) => {
    return PostModel.findOne(data)
}



export default PostModel