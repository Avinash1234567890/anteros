import React from 'react';
import ActivityItem from './ActivityItem';
import '../styles/Pool.css';

const Pool = ({ users = [] }) => {
  // Sample data for all users (replace with real data later)
  const defaultUsers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      isSingle: 'yes'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      age: 30,
      isSingle: 'no',
      partnerName: 'Bob',
      relationshipDuration: '2 years'
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      age: 28,
      isSingle: 'yes'
    },
    {
      firstName: 'Sarah',
      lastName: 'Wilson',
      age: 32,
      isSingle: 'no',
      partnerName: 'Tom',
      relationshipDuration: '1 year'
    },
    {
      firstName: 'Alex',
      lastName: 'Chen',
      age: 24,
      isSingle: 'yes'
    },
    {
      firstName: 'Emma',
      lastName: 'Davis',
      age: 31,
      isSingle: 'no',
      partnerName: 'David',
      relationshipDuration: '3 years'
    },
    {
      firstName: 'James',
      lastName: 'Wilson',
      age: 26,
      isSingle: 'yes'
    },
    {
      firstName: 'Lisa',
      lastName: 'Brown',
      age: 29,
      isSingle: 'no',
      partnerName: 'Ryan',
      relationshipDuration: '8 months'
    },
    {
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      age: 27,
      isSingle: 'yes'
    },
    {
      firstName: 'Amanda',
      lastName: 'Taylor',
      age: 33,
      isSingle: 'no',
      partnerName: 'Mark',
      relationshipDuration: '4 years'
    }
  ];

  // Use provided users or fall back to default data
  const allUsers = users.length > 0 ? users : defaultUsers;

  return (
    <div className="pool">
      <div className="pool-header">
        <h2 className="pool-title">User Pool</h2>
        <p className="pool-subtitle">All registered users in the system</p>
        <div className="pool-stats">
          <span className="pool-count">{allUsers.length} total users</span>
        </div>
      </div>
      
      <div className="pool-list">
        {allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <ActivityItem
              key={index}
              user={user}
              timestamp="Profile created"
            />
          ))
        ) : (
          <div className="no-users">
            <p>No users found in the system</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pool;
