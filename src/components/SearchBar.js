import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ users = [], onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Filter users based on first name, last name, or full name
    const filteredUsers = users.filter(user => {
      const firstName = user.firstName?.toLowerCase() || '';
      const lastName = user.lastName?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const searchValue = value.toLowerCase();
      
      return firstName.includes(searchValue) || 
             lastName.includes(searchValue) || 
             fullName.includes(searchValue);
    });

    setSearchResults(filteredUsers);
    setShowResults(true);
  };

  const handleUserClick = (user) => {
    setSearchTerm(`${user.firstName} ${user.lastName}`);
    setShowResults(false);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleUserClick(user)}
            >
              <div className="user-info">
                <div className="user-name">
                  {user.firstName} {user.lastName}
                </div>
                <div className="user-details">
                  Age: {user.age} | Status: {user.isSingle === 'yes' ? 'Single' : 'In a relationship'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && searchTerm && searchResults.length === 0 && (
        <div className="search-results">
          <div className="no-results">
            No users found matching "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
