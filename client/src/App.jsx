import React, { useEffect, useState } from 'react';
import { API } from './api';
import socket from './socket';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import Leaderboard from './components/Leaderboard';

export default function App() {
const [users, setUsers] = useState([]);
const [ranking, setRanking] = useState([]);

useEffect(() => {
fetchUsers();
fetchLeaderboard();
const handleUserAdded = (newUser) => {
  setUsers(prev => [...prev, newUser]);
};

const handleLeaderboardUpdate = (updated) => {
  setRanking([...updated]);
};

socket.on('user-added', handleUserAdded);
socket.on('update-leaderboard', handleLeaderboardUpdate);

return () => {
  socket.off('user-added', handleUserAdded);
  socket.off('update-leaderboard', handleLeaderboardUpdate);
};
}, []);

const fetchUsers = async () => {
const res = await API.get('/users');
setUsers(res.data);
};

const fetchLeaderboard = async () => {
const res = await API.get('/leaderboard');
setRanking(res.data);
};

return (
<div className="container">
<h1>🏆 Weekly Leaderboard</h1>
<div className="select-group">
<UserSelector users={users} refreshLeaderboard={fetchLeaderboard} />
</div>
<div className="add-user-form">
<AddUserForm onUserCreated={fetchUsers} />
</div>
<Leaderboard users={ranking} />
</div>
);
}
