import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePost = ({ postToUpdate, onPostUpdated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postToUpdate) {
      setTitle(postToUpdate.title);
      setContent(postToUpdate.content);
    }
  }, [postToUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/posts/${postToUpdate.id}`, { title, content });
      onPostUpdated(response.data);
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        required
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePost;
