import React from 'react';
import ActivityItem from './ActivityItem';
import '../styles/RecentActivity.css';

const RecentActivity = ({ recentUpdates = [] }) => {
  // Sample data for recent profile updates (replace with real data later)
  const defaultUpdates = [
    {
      user: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        age: 28,
        isSingle: 'no',
        partnerName: 'Mike',
        relationshipDuration: '1.5 years'
      },
      timestamp: '2025-09-22, 2:45 PM'
    },
    {
      user: {
        firstName: 'Alex',
        lastName: 'Chen',
        age: 24,
        isSingle: 'yes'
      },
      timestamp: '2025-09-22, 1:30 PM'
    },
    {
      user: {
        firstName: 'Emma',
        lastName: 'Davis',
        age: 31,
        isSingle: 'no',
        partnerName: 'David',
        relationshipDuration: '3 years'
      },
      timestamp: '2025-09-22, 11:15 AM'
    },
    {
      user: {
        firstName: 'James',
        lastName: 'Wilson',
        age: 26,
        isSingle: 'yes'
      },
      timestamp: '2025-09-22, 9:20 AM'
    },
    {
      user: {
        firstName: 'Lisa',
        lastName: 'Brown',
        age: 29,
        isSingle: 'no',
        partnerName: 'Ryan',
        relationshipDuration: '8 months'
      },
      timestamp: '2025-09-21, 4:50 PM'
    }
  ];

  // Use provided updates or fall back to default data
  const updates = recentUpdates.length > 0 ? recentUpdates : defaultUpdates;
  
  // Get the 5 most recent updates
  const recentFive = updates.slice(0, 5);

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <h2 className="recent-activity-title">Recent Activity</h2>
        <p className="recent-activity-subtitle">Latest profile updates</p>
      </div>
      
      <div className="recent-activity-list">
        {recentFive.length > 0 ? (
          recentFive.map((update, index) => (
            <ActivityItem
              key={index}
              user={update.user}
              timestamp={update.timestamp}
            />
          ))
        ) : (
          <div className="no-activity">
            <p>No recent activity to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
