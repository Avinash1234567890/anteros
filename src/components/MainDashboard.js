import React from 'react';
import DashboardPage from './DashboardPage';
import RecentActivity from './RecentActivity';
import Pool from './Pool';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
// Removed hard gating components (ProfileOverlay, ProfileCompletionModal) to make profile optional
import { useUserContext } from '../contexts/UserContext';
import { useUserProfile } from '../hooks/useUserProfile';
import MandatoryProfile from './MandatoryProfile';

const MainDashboard = () => {
  const { users, recentActivity, loading, error, refreshUsers } = useUserContext();
  const { hasProfile, refreshProfile } = useUserProfile();
  const [dismissed, setDismissed] = React.useState(false);

  if (loading) {
    return <LoadingScreen message="Loading dashboard data..." />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refreshUsers} />;
  }

  return (
    <>
      <main className="main-dashboard" style={{ position: 'relative' }}>
        {/* Underlying content (blurred & inert if no profile) */}
        <div style={!hasProfile ? {
          filter: 'blur(4px)',
          opacity: 0.25,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'filter .4s ease, opacity .4s ease'
        } : { transition: 'filter .4s ease, opacity .4s ease' }}>
          <DashboardPage />
          <RecentActivity recentUpdates={recentActivity} />
          <Pool users={users} />
        </div>

        {/* Blocking overlay with profile form */}
  {!hasProfile && !dismissed && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'clamp(20px,4vw,50px) clamp(16px,3.5vw,42px)',
            overflowY: 'auto'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '960px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(26px)',
                WebkitBackdropFilter: 'blur(26px)',
                border: '1px solid rgba(236,72,153,0.35)',
                boxShadow: '0 28px 60px rgba(219,39,119,0.28), inset 0 1px 0 rgba(255,255,255,0.6)',
                borderRadius: '26px',
                padding: '50px 46px 54px',
                position: 'relative'
              }}>
                <MandatoryProfile 
                  isModal={true} 
                  onComplete={async () => {
                    await refreshProfile?.();
                    setDismissed(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MainDashboard;
