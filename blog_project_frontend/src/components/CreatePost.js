// CreatePost.js

import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite beim Submit
    try {
      const response = await axios.post('/api/posts', { title, content });
      onPostCreated(response.data); // Callback-Funktion, um den Parent-Component zu informieren
    } catch (error) {
      console.error('Error while creating the Post', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of the Posts"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="write your Posts"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
