// src/components/CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/posts', { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      alert('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      ></textarea>
      <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">Create Post</button>
    </form>
  );
};

export default CreatePost;