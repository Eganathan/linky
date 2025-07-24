
import React from 'react';

const LinkItem = ({ link, onDelete }) => {
  return (
    <div className="link-item">
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.description}
      </a>
      <button className="btn btn-secondary" onClick={() => onDelete(link.id)}>
        ✕
      </button>
    </div>
  );
};

export default LinkItem;
