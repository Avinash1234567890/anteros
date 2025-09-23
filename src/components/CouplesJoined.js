import React from 'react';
import '../styles/StatCards.css';

const CouplesJoined = ({ totalCouples = 0 }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">Couples Joined</h3>
      </div>
      <div className="stat-card-content">
        <div className="stat-number">{totalCouples.toLocaleString()}</div>
        <p className="stat-description">Total number of couples who joined</p>
      </div>
    </div>
  );
};

export default CouplesJoined;
