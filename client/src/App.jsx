import React, { useEffect, useState } from 'react';
import { API } from './api';
import socket from './socket';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import Leaderboard from './components/Leaderboard';

function App() {
  const [users, setUsers] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    loadUsers();
    loadRanking();

    socket.on('update-leaderboard', data => {
      setRanking(data);
    });

    return () => socket.off('update-leaderboard');
  }, []);

  const loadUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  const loadRanking = async () => {
    const res = await API.get('/leaderboard');
    setRanking(res.data);
  };

  return (
    <div className="container">
      <h2>Real-Time Leaderboard</h2>
      <UserSelector users={users} refreshLeaderboard={loadRanking} />
      <AddUserForm onUserCreated={loadUsers} />
      <Leaderboard users={ranking} />
    </div>
  );
}

export default App;
