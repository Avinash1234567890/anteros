import React, { useState } from 'react';
import SearchBar from './SearchBar';
import '../styles/Navbar.css';
import Profile from './Profile';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ users = [], onUserSelect }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, signOut } = useAuth();

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo on the left */}
          <div className="navbar-logo">
            <img 
              src="/logowings.png" 
              alt="Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="logo-placeholder" style={{display: 'none'}}>
              LOGO
            </div>
          </div>

          {/* SearchBar in the middle */}
          <div className="navbar-search">
            <SearchBar users={users} onUserSelect={onUserSelect} />
          </div>

          {/* Profile button on the right */}
          <div className="navbar-profile">
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
            </div>
            <button 
              className="profile-button"
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button 
              className="signout-button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      
      {/* Profile modal or overlay */}
      {showProfile && (
        <div className="profile-overlay">
          <div className="profile-modal">
            <div className="profile-header">
              <button 
                className="close-profile"
                onClick={() => setShowProfile(false)}
              >
                ×
              </button>
            </div>
            <Profile onClose={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
