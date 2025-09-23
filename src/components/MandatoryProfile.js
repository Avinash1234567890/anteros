import React, { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext';
import PartnerSearch from './PartnerSearch';
import '../styles/Profile.css';

const MandatoryProfile = ({ isModal = false }) => {
  const { createUserProfile } = useUserProfile();
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    isSingle: '',
    partnerName: '',
    partnerEmail: '', // Add partner email for matching
    relationshipDuration: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      // Convert string values to proper types for database
      const profileData = {
        ...formData,
        age: parseInt(formData.age, 10),
        isSingle: formData.isSingle === 'yes' // Convert "yes"/"no" to boolean
      };
      
      const result = await createUserProfile(profileData);
      
      if (result.success) {
        setMessage('Profile created successfully!');
        // The useUserProfile hook will automatically update and allow access to the app
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={`mandatory-profile-container ${isModal ? 'modal-style' : ''}`}>
      <div className="mandatory-profile-card">
        <div className="mandatory-profile-header">
          {!isModal && <img src="/logowings.png" alt="Logo" className="profile-logo" />}
          <h2 className="mandatory-profile-title">
            {isModal ? 'Complete Your Profile' : 'Complete Your Profile'}
          </h2>
          <p className="mandatory-profile-subtitle">
            Welcome {user?.email}! Please complete your profile to access the application.
          </p>
          {!isModal && (
            <button 
              className="signout-link"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              required
              placeholder="Enter your age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="isSingle">Relationship Status *</label>
            <select
              id="isSingle"
              name="isSingle"
              value={formData.isSingle}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your status</option>
              <option value="yes">Single</option>
              <option value="no">In a relationship</option>
            </select>
          </div>

          {formData.isSingle === 'no' && (
            <>
              <div className="form-group">
                <label htmlFor="partnerName">Partner Name *</label>
                <PartnerSearch
                  value={formData.partnerName}
                  onChange={(partnerName, partnerUser) => {
                    setFormData(prev => ({
                      ...prev,
                      partnerName: partnerName,
                      partnerEmail: partnerUser ? partnerUser.email : ''
                    }));
                  }}
                  currentUserEmail={user?.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="relationshipDuration">Relationship Duration *</label>
                <input
                  type="text"
                  id="relationshipDuration"
                  name="relationshipDuration"
                  value={formData.relationshipDuration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 years, 6 months"
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? 'Creating Profile...' : 'Complete Profile & Enter App'}
          </button>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MandatoryProfile;
