import React from 'react';

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <div className="error-screen">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#dc2626',
        textAlign: 'center',
        padding: '20px',
        gap: '16px'
      }}>
        <div style={{
          fontSize: '48px',
          color: '#ef4444'
        }}>
          ⚠️
        </div>
        <div>
          <h2 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>
            Something went wrong
          </h2>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
            {error || 'An unexpected error occurred'}
          </p>
          {onRetry && (
            <button 
              onClick={onRetry}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
