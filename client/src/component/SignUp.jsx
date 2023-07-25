import React, { useState } from 'react';
import './css/SignUp.css'; 
import axios from 'axios';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API call to the sign-up endpoint
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      });

      // Assuming the API returns a success status and a token or user data upon successful sign-up
      // You can update your actual API response accordingly
      if (response.status === 200) {
        setError(''); // Clear any previous error messages
        console.log('Form submitted:', { name, email, password });
        // You can store the token or user data in localStorage or a cookie for authentication persistence
        // For example:
        localStorage.setItem('token', response.data.token);

        // Call the onSignUp function passed as a prop to notify the parent component (App.js) of successful sign-up
        onSignUp();
      } else {
        setError('Sign-up failed. Please try again.'); // Show error message for sign-up failure
      }
    } catch (error) {
      setError('An error occurred while signing up.');
      console.error('Sign-up Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your name'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='your email address'
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
            placeholder='creat password'
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
