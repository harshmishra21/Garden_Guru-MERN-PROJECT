const Post = require('../models/Post');

// @desc    Saare posts lao
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Post create karo
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        res.status(400);
        throw new Error('Please add content');
    }

    const image = req.file ? req.file.path : '';

    try {
        const post = await Post.create({
            user: req.user.id,
            content,
            image, // Simplified: maan lo string URL hai
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPosts,
    createPost,
};
