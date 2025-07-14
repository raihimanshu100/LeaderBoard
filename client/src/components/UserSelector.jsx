import React, { useState } from 'react';
import { API } from '../api';

const UserSelector = ({ users, refreshLeaderboard }) => {
  const [selected, setSelected] = useState('');

  const handleClaim = async () => {
    if (!selected) return alert('Choose a user first.');
    const response = await API.post(`/claim/${selected}`);
    alert(`Awarded ${response.data.points} points!`);
    refreshLeaderboard();
  };

  return (
    <div>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleClaim}>Claim Points</button>
    </div>
  );
};

export default UserSelector;
