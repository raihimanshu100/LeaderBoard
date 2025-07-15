import React, { useState } from 'react';
import { API } from '../api';

const AddUserForm = ({ onUserCreated }) => {
const [name, setName] = useState('');

const submitUser = async () => {
if (!name.trim()) return;
try {
await API.post('/users', { name });
setName('');
onUserCreated(); // Trigger user refresh
} catch (error) {
console.error('Error adding user:', error);
}
};

return (
<>
<input
type="text"
placeholder="Enter new user"
value={name}
onChange={e => setName(e.target.value)}
/>
<button onClick={submitUser}>Add User</button>
</>
);
};

export default AddUserForm;