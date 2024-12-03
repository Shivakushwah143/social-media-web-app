import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 bg-gradient-to-r from-blue-400 to-purple-500 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Heading */}
      <h2 className="text-2xl text-white font-semibold text-center mb-6">Create a New Post</h2>

      {/* Text Content */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 resize-none"
        rows="5"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-3 text-white bg-gradient-to-r from-red-400 to-orange-500 rounded-lg hover:bg-gradient-to-r transition-all duration-300 transform hover:scale-105"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;


