import React, { useState } from 'react';
import { API } from '../api';

const AddUserForm = ({ onUserCreated }) => {
  const [name, setName] = useState('');

  const submitUser = async () => {
    if (!name.trim()) return;
    await API.post('/users', { name });
    setName('');
    onUserCreated();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New User Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={submitUser}>Add User</button>
    </div>
  );
};

export default AddUserForm;
