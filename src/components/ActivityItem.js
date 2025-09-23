import React from 'react';
import '../styles/ActivityItem.css';

const ActivityItem = ({ user, timestamp = new Date().toLocaleString() }) => {
  if (!user) return null;

  return (
    <div className="activity-item">
      <div className="activity-content">
        {/* Name section */}
        <div className="activity-section name-section">
          <span className="activity-label">Name:</span>
          <span className="activity-value">{user.firstName} {user.lastName}</span>
        </div>

        {/* Age section */}
        <div className="activity-section age-section">
          <span className="activity-label">Age:</span>
          <span className="activity-value">{user.age}</span>
        </div>

        {/* Relationship status section */}
        <div className="activity-section status-section">
          <span className="activity-label">Status:</span>
          <span className="activity-value">
            {user.isSingle ? 'Single' : 'In a relationship'}
          </span>
        </div>

        {/* Partner information (if applicable) */}
        {!user.isSingle && (
          <>
            <div className="activity-section partner-section">
              <span className="activity-label">Partner:</span>
              <span className="activity-value">{user.partnerName}</span>
            </div>

            <div className="activity-section duration-section">
              <span className="activity-label">Duration:</span>
              <span className="activity-value">{user.relationshipDuration}</span>
            </div>
          </>
        )}

        {/* Timestamp */}
        <div className="activity-section timestamp-section">
          <span className="activity-label">Last Updated:</span>
          <span className="activity-value timestamp">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
