import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8">
      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-4 bg-white rounded shadow">
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500">
            Posted by: {post.user?.username || 'Unknown User'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
