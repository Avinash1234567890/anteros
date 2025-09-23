import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if current user has a profile
  const checkUserProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error && error.code !== 'PGRST116') { 
        // PGRST116 is "not found" error - this is expected for new users
        throw error;
      }

      // If no profile found, that's okay - user just needs to create one
      setProfile(data || null);
    } catch (error) {
      console.error('Error checking user profile:', error);
      setError(error.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Create user profile
  const createUserProfile = async (profileData) => {
    if (!user) {
      return { success: false, error: 'No authenticated user' };
    }

    try {
      // First, check if a profile already exists
      const { data: existingProfile } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (existingProfile) {
        console.log('Existing profile found:', existingProfile);
        // Profile already exists, update it instead
        return await updateUserProfile(profileData);
      }

      console.log('Creating new profile with data:', profileData);
      // No existing profile, create new one
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: user.email,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          age: profileData.age,
          is_single: profileData.isSingle,
          partner_name: profileData.partnerName,
          partner_email: profileData.partnerEmail,
          relationship_duration: profileData.relationshipDuration
        }])
        .select()
        .single();

      if (error) throw error;

      console.log('Profile created successfully:', data);
      setProfile(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error creating user profile:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    if (!user) {
      return { success: false, error: 'No authenticated user' };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          age: profileData.age,
          is_single: profileData.isSingle,
          partner_name: profileData.partnerName,
          partner_email: profileData.partnerEmail,
          relationship_duration: profileData.relationshipDuration,
          updated_at: new Date().toISOString()
        })
        .eq('email', user.email)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    if (user) {
      checkUserProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    profile,
    loading,
    error,
    hasProfile: !!profile,
    createUserProfile,
    updateUserProfile,
    refreshProfile: checkUserProfile
  };
};
