import mongoose from "mongoose";
import postModel from "../Models/postModel.js";

export const getPost = async (req, res) => {
  const { id: _id } = req.params
  try {
    const post = await postModel.findById(_id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getPosts = async (req, res) => {
  const { page } = req.query
  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await postModel.countDocuments({})
    const posts = await postModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchTitle, tags } = req.query
  try {
    const title = new RegExp(searchTitle, 'i')
    const posts = await postModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new postModel({ ...post, creator: req.userId })
  try {
    await newPost.save()
    res.status(201).json(newPost)
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Post Id")
  const updatedPost = await postModel.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
  res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Post Id")
  await postModel.findByIdAndDelete(_id)
  res.status(200).json({ message: "Post Deleted Successfully" })
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params
  if (!req.userId) {
    return res.json({ message: UnAuthenticated })
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Post Id")
  const post = await postModel.findById(_id)
  const index = post.likes.findIndex((id) => id === String(req.userId))
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((id) => {
      return id !== String(req.userId)
    })
  }
  const updatedPost = await postModel.findByIdAndUpdate(_id, post, { new: true })
  res.status(200).json(updatedPost)
}

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const post = await postModel.findById(id)
    post.comments.push(comment)
    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json(error)
  }
}