// routes/posts.js
import express from 'express';
import Post from '../models/Post.js';
import auth from '../middlewar/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const post = new Post({
      user: req.user.userId,
      content: req.body.content,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.likes.includes(req.user.userId)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.userId);
    } else {
      post.likes.push(req.user.userId);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error liking/unliking post' });
  }
});

export default router;