const User = require('../models/User');
const Post = require('../models/Post');
const { route } = require('./auth');
const express = require('express');
const router = express.Router();

// Get a user's profile and their posts
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(404).json({ msg: 'User not found' });
  }
});

module.exports=router;