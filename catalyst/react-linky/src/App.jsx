
import React, { useState, useEffect } from 'react';
import CollectionList from './components/CollectionList';
import AddCollectionForm from './components/AddCollectionForm';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import AuthGuard from './components/AuthGuard';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Use fetch instead of axios for better Catalyst compatibility
        const response = await fetch('/api/collections', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error('Failed to fetch collections:', err);
        setError('Failed to fetch collections.');
      }
      setLoading(false);
    };

    fetchCollections();
  }, []);

  const addCollection = async (collection) => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collection),
      });
      
      if (response.ok) {
        const newCollection = await response.json();
        setCollections([...collections, newCollection]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Failed to create collection:', err);
      setError('Failed to create collection.');
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setCollections(collections.filter((c) => c.id !== collectionId));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Failed to delete collection:', err);
      setError('Failed to delete collection.');
    }
  };

  return (
    <AuthGuard>
      <div className="App">
        <UserProfile />
        <h1>Linky</h1>
        <AddCollectionForm onAdd={addCollection} />
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
        {loading ? (
          <Spinner />
        ) : (
          <CollectionList collections={collections} onDelete={deleteCollection} />
        )}
      </div>
    </AuthGuard>
  );
}

export default App;
