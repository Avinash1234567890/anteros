import React, { useState } from 'react';
import SearchBar from './SearchBar';
import '../styles/Navbar.css';
import Profile from './Profile';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ users = [], onUserSelect }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const truncatedEmail = user?.email && user.email.length > 22
    ? user.email.slice(0, 10) + '…' + user.email.slice(-8)
    : user?.email;

  return (
    <>
      <nav className="navbar">
        <div className={`navbar-container ${menuOpen ? 'mobile-open' : ''}`}>
          {/* Logo on the left */}
          <div className="navbar-logo">
            <img 
              src="/bitheartlogo.png" 
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
          <button 
            className="navbar-hamburger" 
            aria-label="Toggle menu" 
            onClick={() => setMenuOpen(o => !o)}
          >
            <span/>
            <span/>
            <span/>
          </button>

          <div className="navbar-flex-spacer" />

          <div className="navbar-collapsible">
            <div className="navbar-search">
              <SearchBar users={users} onUserSelect={onUserSelect} />
            </div>
            <div className="navbar-profile">
              <div className="user-info">
                <span className="user-email" title={user?.email}>{truncatedEmail}</span>
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
