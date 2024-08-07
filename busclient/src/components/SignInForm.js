import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate(); 

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
 
      const response = await axios.post('http://localhost:3000/api/signin', {
        email,
        password
      });

      if (response.data.message === "Sign in successful") {
        setIsLoginSuccessful(true);
        window.alert('Login successful!');
        navigate('/newquery'); 
      } else {
        window.alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      window.alert('Login failed: Invalid credentials');
      console.error('Error signing in:', error.message);
    }
  };

  

  return (
    <form className="auth-form" onSubmit={handleSignIn}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default SignInForm;
