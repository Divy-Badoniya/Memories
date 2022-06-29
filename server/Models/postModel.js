import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {type: [String], default: []},
    comments: {type: [String], default: []},
}, {timestamps: true});

const postModel = mongoose.model('posts', postSchema);

export default postModel;