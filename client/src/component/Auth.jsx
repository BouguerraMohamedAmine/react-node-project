import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import './css/auth.css'

const AuthPage = () => {
  return (
    <div className="auth-page-container">
      <SignUp />
      <Login />
    </div>
  );
};

export default AuthPage;
