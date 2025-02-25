import React, { useState, useEffect } from 'react';
import '../styles/background.css';
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/LoginPage.css";
import { NavLink } from "react-router-dom";
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const { login, error, isLoading } = useLogin();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Force a re-render when error changes
  const [loginError, setLoginError] = useState(null);
  useEffect(() => {
    setLoginError(error);
  }, [error]);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh
    await login(email, password);
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h2>Email</h2>
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <FaUser className="icon"/>
          </div>

          <h2>Lösenord</h2>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Lösenord" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <FaLock className="icon"/>
          </div>

          {/* Show error message */}
          {error && <div className="error">{error}</div>}

          <button className="loggain-button" type="submit" disabled={isLoading}>
            {isLoading ? "Loggar in..." : "Logga in"}
          </button>

          <div className="forgot-password-link">
            <NavLink to="/forgot-password" className="i_forgor">
              Glömt lösenordet?
            </NavLink>
          </div>
        </form>
      </div>
      
      <div className="disclaimer">
        Inloggning enbart menad för arrangörer och organisationer, användare behöver inte logga in.
      </div>
    </div>
  );
};

export default LoginPage;
