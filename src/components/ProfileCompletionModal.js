// NOTE: This component previously enforced mandatory profile completion.
// It is now unused (profile is optional). Retained for potential future reinstatement.
import React from 'react';
import MandatoryProfile from './MandatoryProfile';
import { useUserProfile } from '../hooks/useUserProfile';

const ProfileCompletionModal = () => {
  const { hasProfile, loading } = useUserProfile();

  // Don't show modal if profile exists or still loading
  if (hasProfile || loading) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '0',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{
          padding: '24px 24px 16px 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827'
          }}>
            Complete Your Profile
          </h2>
          <p style={{
            margin: '8px 0 0 0',
            color: '#6b7280',
            fontSize: '16px'
          }}>
            Please fill out your profile information to access all features of the app.
          </p>
        </div>
        
        <div style={{ padding: '0' }}>
          <MandatoryProfile isModal={true} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
