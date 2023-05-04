import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost); //change on frontend
router.delete('/:id', auth, deletePost); //change on frontend
router.patch('/:id/likePost', auth, likePost); //change on backend
router.post('/:id/commentPost', auth, commentPost); //change on backend

export default router;