import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-info">
        <span className="user-welcome">
          👋 Welcome, {user.first_name || user.email_id || 'User'}!
        </span>
        <button 
          onClick={logout}
          className="btn btn-secondary logout-btn"
          title="Logout"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
