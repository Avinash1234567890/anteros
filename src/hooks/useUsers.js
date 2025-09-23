import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export const useUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    if (!user) {
      setUsers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user (admin function)
  const addUser = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          age: userData.age,
          is_single: userData.isSingle,
          partner_name: userData.partnerName,
          relationship_duration: userData.relationshipDuration,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      // Refresh the users list
      fetchUsers();
      return { success: true, data };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, error: error.message };
    }
  };

  // Update a user
  const updateUser = async (userId, userData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: userData.firstName,
          last_name: userData.lastName,
          age: userData.age,
          is_single: userData.isSingle,
          partner_name: userData.partnerName,
          relationship_duration: userData.relationshipDuration,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select();

      if (error) throw error;

      // Refresh the users list
      fetchUsers();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Refresh the users list
      fetchUsers();
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }
  };

  // Get recent activity (last 5 updates)
  const getRecentActivity = () => {
    return users
      .slice(0, 5)
      .map(user => ({
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          age: user.age,
          isSingle: user.is_single,
          partnerName: user.partner_name,
          relationshipDuration: user.relationship_duration
        },
        timestamp: new Date(user.updated_at).toLocaleString()
      }));
  };

  // Convert Supabase user format to component format
  const formatUsersForComponents = () => {
    const formatted = users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      isSingle: user.is_single,
      partnerName: user.partner_name,
      relationshipDuration: user.relationship_duration
    }));
    
    console.log('Raw users from DB:', users);
    console.log('Formatted users:', formatted);
    return formatted;
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    users: formatUsersForComponents(),
    recentActivity: getRecentActivity(),
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    refreshUsers: fetchUsers
  };
};
