import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext';
import PartnerSearch from './PartnerSearch';

const Profile = ({ onClose }) => {
  const { profile, updateUserProfile } = useUserProfile();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    isSingle: '',
    partnerName: '',
    partnerEmail: '',
    relationshipDuration: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Load existing profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        age: profile.age || '',
        isSingle: profile.is_single ? 'yes' : 'no', // Convert boolean to string for form
        partnerName: profile.partner_name || '',
        partnerEmail: profile.partner_email || '',
        relationshipDuration: profile.relationship_duration || ''
      });
    }
  }, [profile]);

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
      
      const result = await updateUserProfile(profileData);
      
      if (result.success) {
        setMessage('Profile updated successfully!');
        
        // Close profile after 2 seconds
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Information</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isSingle">Single Status</label>
          <select
            id="isSingle"
            name="isSingle"
            value={formData.isSingle}
            onChange={handleInputChange}
            required
          >
            <option value="">Select status</option>
            <option value="yes">Yes (Single)</option>
            <option value="no">No (In a relationship)</option>
          </select>
        </div>

        {formData.isSingle === 'no' && (
          <>
            <div className="form-group">
              <label htmlFor="partnerName">Partner Name</label>
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
              <label htmlFor="relationshipDuration">Relationship Duration</label>
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
          {submitting ? 'Updating...' : 'Update Profile'}
        </button>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
