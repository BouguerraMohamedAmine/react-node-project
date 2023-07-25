import React, { useState } from 'react';
import './css/Login.css'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Simulate login logic (replace this with your actual login logic/API call)
      // For this example, let's assume the login is successful if email and password are not empty
      if (email && password) {
        setError(''); // Clear any previous error messages
        console.log('Form submitted:', { email, password });
        // You can add your actual login logic/API call here

        // After successful login, you can redirect to the dashboard page or update state accordingly
      } else {
        setError('Please provide both email and password.');
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
            placeholder='Email'
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
            placeholder='password'
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
