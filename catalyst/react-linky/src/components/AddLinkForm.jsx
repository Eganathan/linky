
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
    <form onSubmit={handleSubmit} className="form-container" style={{ marginTop: '1.5rem' }}>
      <input
        type="url"
        placeholder="🌐 Enter link URL (e.g., https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="📝 Describe this link"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">➕ Add Link</button>
    </form>
  );
};

export default AddLinkForm;
