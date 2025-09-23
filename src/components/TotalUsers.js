import React from 'react';
import '../styles/StatCards.css';

const TotalUsers = ({ totalUsers = 0 }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">Total Users</h3>
      </div>
      <div className="stat-card-content">
        <div className="stat-number">{totalUsers.toLocaleString()}</div>
        <p className="stat-description">Total amount of people signed up</p>
      </div>
    </div>
  );
};

export default TotalUsers;
