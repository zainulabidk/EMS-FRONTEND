// UserComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when the component mounts
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.fname} {user.lname} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
