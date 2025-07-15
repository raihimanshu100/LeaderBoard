import React from 'react';

const Leaderboard = ({ users }) => {
return (
<table>
<thead>
<tr>
<th>Rank</th>
<th>User</th>
<th>Points</th>
</tr>
</thead>
<tbody>
{users.map((user, index) => (
<tr key={user._id}>
<td>{index + 1}</td>
<td>{user.name}</td>
<td>{user.totalPoints}</td>
</tr>
))}
</tbody>
</table>
);
};

export default Leaderboard;
