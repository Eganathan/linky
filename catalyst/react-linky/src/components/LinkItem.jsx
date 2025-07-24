
import React from 'react';

const LinkItem = ({ link, onDelete }) => {
  return (
    <div className="link-item">
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.description}
      </a>
      <button onClick={() => onDelete(link.id)}>Delete</button>
    </div>
  );
};

export default LinkItem;
