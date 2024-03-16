import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setCreating(false);
    setPosts([...posts, newPost]);
  };

  const handleDeleteSuccess = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleCreateClick = () => {
    setCreating(true);
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      {!creating && (
        <button onClick={handleCreateClick}>Neuen Post erstellen</button>
      )}
      {creating && (
        <CreatePost onPostCreated={handlePostCreated} />
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} onDeleteSuccess={handleDeleteSuccess} />
      ))}
    </div>
  );
};

export default PostList;
