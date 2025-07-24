
import React, { useState } from 'react';
import axios from 'axios';
import LinkItem from './LinkItem';
import AddLinkForm from './AddLinkForm';

const CollectionCard = ({ collection, onDelete }) => {
  const [links, setLinks] = useState(collection.links);

  const addLink = async (link) => {
    const response = await axios.post(
      `/api/collections/${collection.id}/links`,
      link
    );
    setLinks([...links, response.data]);
  };

  const deleteLink = async (linkId) => {
    await axios.delete(`/api/links/${linkId}`);
    setLinks(links.filter((l) => l.id !== linkId));
  };

  return (
    <div className="collection-card">
      <h2>{collection.title}</h2>
      <p>{collection.description}</p>
      <button 
        className="btn btn-danger" 
        onClick={() => onDelete(collection.id)}
        style={{ marginBottom: '1rem' }}
      >
        🗑️ Delete Collection
      </button>
      <div>
        {links.map((link) => (
          <LinkItem key={link.id} link={link} onDelete={deleteLink} />
        ))}
      </div>
      <AddLinkForm onAdd={addLink} />
    </div>
  );
};

export default CollectionCard;
