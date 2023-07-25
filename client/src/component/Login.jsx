import React, { useState } from 'react';
import './css/Login.css'; 
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API call to the login endpoint
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Assuming the API returns a success status and a token or user data upon successful login
      // You can update your actual API response accordingly
      if (response.status === 200) {
        setError(''); // Clear any previous error messages
        console.log('Form submitted:', { email, password });
        // You can store the token or user data in localStorage or a cookie for authentication persistence
        // For example:
        localStorage.setItem('token', response.data.token);

        // Call the onLogin function passed as a prop to notify the parent component (App.js) of successful login
        onLogin();
      } else {
        setError('Invalid email or password.'); // Show error message for incorrect credentials
      }
    } catch (error) {
      setError('An error occurred while logging in.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
