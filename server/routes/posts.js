const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new post (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      author: req.user,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create post' });
  }
});

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch posts' });
  }
});

module.exports = router;
