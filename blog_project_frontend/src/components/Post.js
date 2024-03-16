import React from 'react';
import axios from 'axios';

const Post = ({ post, onDeleteSuccess, onEditClick }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post.id}`);
      onDeleteSuccess(post.id);
    } catch (error) {
      console.error('Fehler beim Löschen des Posts', error);
    }
  };

  return (
    <div style={{ margin: '20px', border: '1px solid #ccc', padding: '20px' }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => onEditClick(post)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
