
import React, { useState } from 'react';

const AddCollectionForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container glass-card">
      <input
        type="text"
        placeholder="📚 Collection name (e.g., 'Web Development Tools')"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="📖 Brief description of this collection"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">✨ Create Collection</button>
    </form>
  );
};

export default AddCollectionForm;
