

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))?.id || ''; // Replace with actual user retrieval logic

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        alert('Error fetching posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle like/unlike functionality
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === response.data._id ? response.data : post
        )
      );
    } catch (error) {
      alert('Error liking/unliking the post.');
    }
  };

  // Handle adding a comment
  const handleAddComment = async (postId, commentContent) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === response.data._id ? response.data : post
        )
      );
    } catch (error) {
      alert('Error adding a comment.');
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-600">Loading posts...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {posts.map((post) => (
        <div key={post._id} className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 p-4 mb-6 rounded-lg shadow-lg text-white">
          {/* Post Content */}
          <p className="mb-3 text-lg font-medium">{post.content}</p>
          <p className="text-sm italic text-gray-200">
            Posted by: {post.user?.username || 'Unknown User'}
          </p>


          {/* Like Button */}
          <button
            onClick={() => handleLike(post._id)}
            className={`px-5 py-2 mt-4 rounded-full ${
              post.likes.includes(userId)
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            } transition duration-300 ease-in-out`}
          >
            {post.likes.includes(userId) ? 'Unlike' : 'Like'}
          </button>
          <p className="mt-2 text-sm">
            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
          </p>

          {/* Display Comments */}
          {post.comments.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold">Comments:</p>
              <ul className="list-disc list-inside">
                {post.comments.map((comment) => (
                  <li key={comment._id} className="text-sm text-gray-200">
                    <span className="font-semibold">
                      {comment.user?.username || ' User'}:
                    </span>{' '}
                    {comment.content}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add a New Comment */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddComment(post._id, e.target.value.trim());
                  e.target.value = ''; // Clear input field
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

