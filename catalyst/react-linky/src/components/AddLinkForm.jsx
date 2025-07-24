
import React, { useState } from 'react';

const AddLinkForm = ({ onAdd }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ url, description });
    setUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="url"
        placeholder="Link URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Link Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Link</button>
    </form>
  );
};

export default AddLinkForm;
