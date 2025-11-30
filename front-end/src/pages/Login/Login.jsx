import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Login request to your public login endpoint
      const res = await fetch('/api/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save the JWT returned by the backend
        localStorage.setItem('token', data.token);
        // Redirect after login
        navigate('/dashboard'); 
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError(`Server error: ${err}`);
    }
  };

  // Example function to call a private API route after login
  const fetchPrivateData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please login first');
      return;
    }

    try {
      const res = await fetch('/api/private/health', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // JWT goes here
        },
      });

      const data = await res.json();
      console.log('Private API response:', data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch private data');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: '1rem' }}>
          Login
        </button>
      </form>

      {/* Button to test private API. This will work if the user is logged in with proper perms */}
      <button onClick={fetchPrivateData} style={{ marginTop: '1rem' }}>
        Test Private API
      </button>
    </div>
  );
}
