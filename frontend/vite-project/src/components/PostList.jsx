// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/posts');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       {posts.map((post) => (
//         <div key={post._id} className="p-4 mb-4 bg-white rounded shadow">
//           <p className="mb-2">{post.content}</p>
//           <p className="text-sm text-gray-500">
//             Posted by: {post.user?.username || 'Unknown User'}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const userId = 'currentUserId'; // Replace with actual logged-in user ID (e.g., fetched from auth context or localStorage).

  // Fetch posts from the server
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

  // Handle like/unlike
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${postId}/like`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is set in localStorage
        },
      });
      // Update the posts state with the new likes
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === response.data._id ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-4 bg-white rounded shadow">
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500">
            Posted by: {post.user?.username || 'Unknown User'}
          </p>
          <button
            onClick={() => handleLike(post._id)}
            className={`px-4 py-2 mt-2 rounded ${
              post.likes.includes(userId)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {post.likes.includes(userId) ? 'Unlike' : 'Like'}
          </button>
          <p className="mt-1 text-sm text-gray-500">
            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
