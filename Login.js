import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, isAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    
    // MOCK CREDENTIALS: username: admin, password: password123
    if (username === 'admin' && password === 'password123') {
      console.log('Credentials valid, logging in...');
      onLogin();
      setTimeout(() => {
        navigate('/home');
      }, 100);
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials! Try admin / password123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌊 Ocean Guard</h1>
        <p>Please login to explore the impact of overfishing</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Enter Portal</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
