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
        {users.map((u, index) => (
          <tr key={u._id}>
            <td>{index + 1}</td>
            <td>{u.name}</td>
            <td>{u.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
