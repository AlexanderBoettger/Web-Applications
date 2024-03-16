import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editPost, setEditPost] = useState(null);

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


  const handleEditClick = (post) => {
    setEditPost(post); // Setzen des zu bearbeitenden Posts
    setCreating(false); // Deaktiviert den Erstellungsmodus
  };

    // Funktion zum Aktualisieren eines Posts
    const handlePostUpdated = (updatedPost) => {
        const updatedPosts = posts.map((p) =>
          p.id === updatedPost.id ? updatedPost : p
        );
        setPosts(updatedPosts);
        setEditPost(null); // Bearbeitungsmodus deaktivieren
      };

      return (
        <div>
          <h2>Blog Posts</h2>
          {!creating && !editPost && (
            <button onClick={() => setCreating(true)}>Create new Post</button>
          )}
          {creating && <CreatePost onPostCreated={handlePostCreated} />}
          {editPost && (
            <UpdatePost postToUpdate={editPost} onPostUpdated={handlePostUpdated} />
          )}
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDeleteSuccess={handleDeleteSuccess}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      );
    };
    
    export default PostList;