import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'
import Button from '../components/controllers/Button';


function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    if (userId && password) {
      navigate('/home'); 
    }
  };

  return (
   
      <div className="container">
        <h1>Login </h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button buttonName = "Login" handleClick={handleLogin}/>
      </div>
    
  );
}

export default LoginPage;
