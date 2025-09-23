import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';

const PartnerSearch = ({ value, onChange, currentUserEmail }) => {
  const { users } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  console.log('PartnerSearch Debug:', {
    usersCount: users.length,
    currentUserEmail,
    searchQuery,
    showDropdown,
    users: users.map(u => ({ name: `${u.firstName} ${u.lastName}`, email: u.email }))
  });

  // Filter users based on search query (exclude current user)
  const filteredUsers = users.filter(user => {
    if (user.email === currentUserEmail) return false; // Don't show current user
    
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  console.log('Filtered users:', filteredUsers.length, filteredUsers);

  // Initialize with existing value if provided
  useEffect(() => {
    if (value && value !== searchQuery) {
      setSearchQuery(value);
      // Try to find the user in the system
      const foundUser = users.find(user => 
        `${user.firstName} ${user.lastName}` === value
      );
      setSelectedPartner(foundUser);
    }
  }, [value, users]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log('Search query changed:', query);
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
    
    // If manually typing, clear selected partner
    if (selectedPartner && `${selectedPartner.firstName} ${selectedPartner.lastName}` !== query) {
      setSelectedPartner(null);
    }
    
    onChange(query);
  };

  const handlePartnerSelect = (user) => {
    const partnerName = `${user.firstName} ${user.lastName}`;
    setSearchQuery(partnerName);
    setSelectedPartner(user);
    setShowDropdown(false);
    onChange(partnerName, user); // Pass both name and user object
  };

  const handleFocus = () => {
    console.log('Input focused, searchQuery:', searchQuery);
    setShowDropdown(true); // Always show dropdown on focus if there are users
  };

  const handleBlur = () => {
    // Delay closing to allow for clicks
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search for your partner..."
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '16px',
          backgroundColor: '#ffffff'
        }}
      />
      
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '2px solid #d1d5db',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div
                key={user.email}
                onClick={() => handlePartnerSelect(user)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Age: {user.age}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {user.isSingle ? 'Single' : 'In relationship'}
                </div>
              </div>
            ))
          ) : searchQuery ? (
            <div style={{
              padding: '12px 16px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              No users found matching "{searchQuery}". Your partner may not have joined yet.
            </div>
          ) : (
            <div style={{
              padding: '12px 16px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              {users.length === 0 || users.filter(u => u.email !== currentUserEmail).length === 0 
                ? 'No other users have joined yet.' 
                : 'Start typing to search for your partner...'}
            </div>
          )}
        </div>
      )}
      
      {selectedPartner && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#166534'
        }}>
          ✓ Partner found in system: {selectedPartner.firstName} {selectedPartner.lastName}
        </div>
      )}
    </div>
  );
};

export default PartnerSearch;
