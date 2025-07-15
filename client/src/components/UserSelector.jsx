import React, { useState } from 'react';
import { API } from '../api';

const UserSelector = ({ users, refreshLeaderboard }) => {
const [selected, setSelected] = useState('');

const handleClaim = async () => {
if (!selected) {
alert('Please select a user first.');
return;
}
try {
  const res = await API.post(`/claim/${selected}`);
  alert(` ${res.data.points} points awarded!`);
  refreshLeaderboard(); 
} catch (err) {
  console.error('Error claiming points:', err);
}
};

return (
<>
<select value={selected} onChange={e => setSelected(e.target.value)}>
<option value="">Select a user</option>
{users.map(user => (
<option key={user._id} value={user._id}>
{user.name}
</option>
))}
</select>
<button onClick={handleClaim}>Claim Points</button>
</>
);
};

export default UserSelector;
