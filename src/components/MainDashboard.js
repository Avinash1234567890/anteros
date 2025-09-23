import React from 'react';
import DashboardPage from './DashboardPage';
import RecentActivity from './RecentActivity';
import Pool from './Pool';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import ProfileOverlay from './ProfileOverlay';
import ProfileCompletionModal from './ProfileCompletionModal';
import { useUserContext } from '../contexts/UserContext';
import { useUserProfile } from '../hooks/useUserProfile';

const MainDashboard = () => {
  const { users, recentActivity, loading, error, refreshUsers } = useUserContext();
  const { hasProfile } = useUserProfile();

  if (loading) {
    return <LoadingScreen message="Loading dashboard data..." />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refreshUsers} />;
  }

  return (
    <>
      {/* Profile completion modal - appears over everything */}
      <ProfileCompletionModal />
      
      <main className="main-dashboard">
        {/* Dashboard stats - always visible */}
        <DashboardPage />
        
        {/* Recent Activity with overlay if no profile */}
        <ProfileOverlay showOverlay={!hasProfile}>
          <RecentActivity recentUpdates={recentActivity} />
        </ProfileOverlay>
        
        {/* Pool with overlay if no profile */}
        <ProfileOverlay showOverlay={!hasProfile}>
          <Pool users={users} />
        </ProfileOverlay>
      </main>
    </>
  );
};

export default MainDashboard;
