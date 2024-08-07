// src/components/AuthPage.js

import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import '../App.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin');

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
  
    <div className="auth-container">
    <h2>BUS RESERVATION PORTAL</h2>
      <div className="auth-tabs">
        <button className={activeTab === 'signin' ? 'active' : ''} onClick={() => toggleTab('signin')}>LOGIN</button>
        <button className={activeTab === 'signup' ? 'active' : ''} onClick={() => toggleTab('signup')}>REGISTER</button>
      </div>
      <div className="auth-form">
        {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthPage;
