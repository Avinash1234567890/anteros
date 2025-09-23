import React from 'react';
import TotalUsers from './TotalUsers';
import Observations from './Observations';
import CouplesJoined from './CouplesJoined';
import { useUserContext } from '../contexts/UserContext';
import { useMutualCouples } from '../hooks/useMutualCouples';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const { users } = useUserContext();
  const { count: mutualCouplesCount } = useMutualCouples();
  
  console.log('Users in DashboardPage:', users);
  console.log('Users detail:', users.map(user => ({ 
    name: `${user.firstName} ${user.lastName}`, 
    isSingle: user.isSingle,
    type: typeof user.isSingle 
  })));
  
  const totalUsers = users.length;
  const observations = users.length; // All users are observations
  const couplesJoined = mutualCouplesCount; // Use actual mutual couples count
  
  console.log('Stats:', { totalUsers, observations, couplesJoined, mutualCouplesCount });

  return (
    <div className="stats-grid">
      <TotalUsers totalUsers={totalUsers} />
      <Observations totalObservations={observations} />
      <CouplesJoined totalCouples={couplesJoined} />
    </div>
  );
};

export default DashboardPage;
