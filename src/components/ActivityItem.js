import React, { useState, useCallback } from 'react';
import '../styles/ActivityItem.css';

const ActivityItem = ({ user, timestamp = new Date().toLocaleString() }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded(e => !e), []);
  const onKey = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  }, [toggle]);
  if (!user) return null;

  return (
    <div className={`activity-item ${expanded ? 'expanded' : ''}`}> 
      <div className="activity-content">
        {/* Accordion Header / Name */}
        <div 
          className="activity-section name-section activity-accordion-header" 
          role="button" 
          tabIndex={0} 
          aria-expanded={expanded}
          aria-controls={`activity-details-${user.id}`}
          onClick={toggle}
          onKeyDown={onKey}
        >
          <span className="activity-label">Name:</span>
          <span className="activity-value name-value">{user.firstName} {user.lastName}</span>
          <span className="activity-accordion-icon" aria-hidden="true">{expanded ? '−' : '+'}</span>
        </div>

        <div 
          id={`activity-details-${user.id}`}
          className="activity-accordion-details"
          hidden={!expanded}
        >
          <div className="activity-section age-section">
            <span className="activity-label">Age:</span>
            <span className="activity-value">{user.age}</span>
          </div>

          <div className="activity-section status-section">
            <span className="activity-label">Status:</span>
            <span className="activity-value">{user.isSingle ? 'Single' : 'In a relationship'}</span>
          </div>

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

          <div className="activity-section timestamp-section">
            <span className="activity-label">Last Updated:</span>
            <span className="activity-value timestamp">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
