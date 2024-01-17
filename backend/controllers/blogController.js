const { default: mongoose } = require('mongoose');
const Post = require('../models/Blog');

const createPost = async (request, response) => {
    try {
        // console.log(request.body);
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
};


const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Post' });
    }

    try {
        console.log(req.body);
        const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body }, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        });

        if (!post) {
            return res.status(400).json({ error: 'No such post' });
        }

        return res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePost = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ error: 'No such post' });
    }
    const post = await Post.findOneAndDelete({ _id: id })

    if (!post) {
        return response.status(400).json({ error: 'No such post' });
    }
    response.status(200).json(post);
};


const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
};

const getAllPosts = async (request, response) => {
    let username = request.query.username;
    // let category = request.query.category;
    let posts;
    try {
        if (username)
            posts = await Post.find({ username: username });
        // else if (category)
        //     posts = await Post.find({ categories: category });
        else
            posts = await Post.find({});

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
};

module.exports = { createPost, updatePost, deletePost, getPost, getAllPosts }