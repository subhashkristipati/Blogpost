const express = require('express');

const { signup, login, logout, getUser } = require('../controllers/userController')
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/blogController');
const { authenticateToken, createNewToken } = require('../controllers/jwtController');
// const { getImage } = require('../controllers/cloudimgController');
// const { uploadImage, getImage } = require('../controllers/imageController');

// const upload = require('../utils/upload');

const router = express.Router();

router.post('/user/login', login);
router.post('/user/signup', signup);
router.post('/user/logout', logout);
router.post('/user/getUser', authenticateToken, getUser);

router.post('/jwt/token', createNewToken);

router.post('/blog/create', authenticateToken, createPost);
router.put('/blog/update/:id', authenticateToken, updatePost);
router.delete('/blog/delete/:id', authenticateToken, deletePost);
router.get('/blog/post/:id', authenticateToken, getPost);
router.get('/blog/posts', authenticateToken, getAllPosts);

// router.post('/file/upload', upload.single('file'), uploadImage);
// router.get('/file/:filename', getImage);
// router.post('/cloudinary/upload', authenticateToken, getImage)

module.exports = router;