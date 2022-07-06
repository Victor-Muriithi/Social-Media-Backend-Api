const express = require('express');
const router = express.Router();

const {getAllPosts, login, signup,}= require('../controllers/postControllers')

router.get('/posts', getAllPosts)
router.post('/user/login', login)
router.post('/user/signup', signup)


module.exports = {router}