
import React, { useState } from 'react';
import LinkItem from './LinkItem';
import AddLinkForm from './AddLinkForm';

const CollectionCard = ({ collection, onDelete }) => {
  const [links, setLinks] = useState(collection.links);

  const addLink = async (link) => {
    try {
      const response = await fetch(`/api/collections/${collection.id}/links`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });
      
      if (response.ok) {
        const newLink = await response.json();
        setLinks([...links, newLink]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to add link:', error);
    }
  };

  const deleteLink = async (linkId) => {
    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setLinks(links.filter((l) => l.id !== linkId));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
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
