
import express from 'express';
import Post from '../models/Post.js';
import auth from '../middlewar/auth.js';

const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    // Destructure content from the request body
    const { content } = req.body;

    // Create a new post with content
    const post = new Post({
      user: req.user.userId,
      content,                
    });

    // Save the post to the database
    await post.save();

    // Send the newly created post back as a response
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Like/unlike a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Toggle like status
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

// Add a comment to a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Create a comment
    const comment = {
      user: req.user.userId, // The user commenting
      content: req.body.content
    };

    // Push the comment to the post's comments array
    post.comments.push(comment);
    await post.save();  // Save the post with the new comment

    // Populate the post with user info for the post and comments
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username') // Populating the user of the post
      .populate('comments.user', 'username'); // Populating the user for the comment

    // Respond with the populated post
    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

// Get post comments
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('comments.user', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

export default router;
