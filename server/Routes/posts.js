import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost, commentPost } from "../Controllers/posts.js";
import auth from "../Middleware/auth.js";

const router = express.Router()

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentPost);

export default router;