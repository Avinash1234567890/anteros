import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export const useMutualCouples = (refreshTrigger = 0) => {
  const { user } = useAuth();
  const [couples, setCouples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMutualCouples = async () => {
    if (!user) {
      setCouples([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get all users who are in relationships
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .eq('is_single', false);

      if (usersError) throw usersError;

      // Find mutual couples
      const mutualCouples = [];
      const processedEmails = new Set();

      for (const user1 of users) {
        if (processedEmails.has(user1.email) || !user1.partner_email) continue;

        // Find if their partner also has them as partner
        const partner = users.find(user2 => 
          user2.email === user1.partner_email && 
          user2.partner_email === user1.email
        );

        if (partner) {
          mutualCouples.push({
            person1: {
              email: user1.email,
              name: `${user1.first_name} ${user1.last_name}`,
              age: user1.age
            },
            person2: {
              email: partner.email,
              name: `${partner.first_name} ${partner.last_name}`,
              age: partner.age
            },
            relationshipDuration: user1.relationship_duration || partner.relationship_duration,
            matchedAt: new Date(Math.max(
              new Date(user1.updated_at).getTime(),
              new Date(partner.updated_at).getTime()
            ))
          });

          // Mark both as processed to avoid duplicates
          processedEmails.add(user1.email);
          processedEmails.add(partner.email);
        }
      }

      setCouples(mutualCouples);
    } catch (error) {
      console.error('Error fetching mutual couples:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMutualCouples();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshTrigger]);

  return {
    couples,
    count: couples.length,
    loading,
    error,
    refresh: fetchMutualCouples
  };
};
