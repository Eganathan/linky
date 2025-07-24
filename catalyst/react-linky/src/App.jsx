
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionList from './components/CollectionList';
import AddCollectionForm from './components/AddCollectionForm';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/collections');
        setCollections(response.data);
      } catch (err) {
        setError('Failed to fetch collections.');
      }
      setLoading(false);
    };

    fetchCollections();
  }, []);

  const addCollection = async (collection) => {
    try {
      const response = await axios.post('/api/collections', collection);
      setCollections([...collections, response.data]);
    } catch (err) {
      setError('Failed to create collection.');
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      await axios.delete(`/api/collections/${collectionId}`);
      setCollections(collections.filter((c) => c.id !== collectionId));
    } catch (err) {
      setError('Failed to delete collection.');
    }
  };

  return (
    <div className="App">
      <h1>Linky</h1>
      <AddCollectionForm onAdd={addCollection} />
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      {loading ? (
        <Spinner />
      ) : (
        <CollectionList collections={collections} onDelete={deleteCollection} />
      )}
    </div>
  );
}

export default App;
