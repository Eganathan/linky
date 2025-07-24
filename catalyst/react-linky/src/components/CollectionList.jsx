
import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionList = ({ collections, onDelete }) => {
  return (
    <div className="collection-list">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CollectionList;
