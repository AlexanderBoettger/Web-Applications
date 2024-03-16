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
      console.error('Fehler beim Erstellen des Posts', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel des Posts"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Inhalt des Posts"
          required
        />
        <button type="submit">Post erstellen</button>
      </form>
    </div>
  );
};

export default CreatePost;
