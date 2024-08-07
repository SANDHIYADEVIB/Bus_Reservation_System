import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      window.alert('Passwords do not match');
      return;
    }

    try {
   
      const response = await axios.post('http://localhost:3000/api/signup', {
        email,
        password
      });

      window.alert('Register successful!');
    } catch (error) {
      window.alert("Error signing up: can't register");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSignUp}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />
      <button type="submit">REGISTER</button>
    </form>
  );
};

export default SignUpForm;
