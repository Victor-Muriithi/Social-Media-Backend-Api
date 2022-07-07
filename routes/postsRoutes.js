const express = require('express');
const router = express.Router();

const {getAllPosts, login, signup, addPost, addComment, addReply,}= require('../controllers/postControllers')

router.get('/posts', getAllPosts)
router.post('/user/login', login)
router.post('/user/signup', signup)
router.post('/user/addPost', addPost)
router.post('/post/addComment', addComment)
router.post('/post/addReply', addReply)


module.exports = {router}