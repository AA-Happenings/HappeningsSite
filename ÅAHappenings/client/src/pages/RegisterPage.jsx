import React from 'react';
import '../styles/background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import "../styles/RegisterPage.css";
import  { useState} from 'react'
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"; 


const RegisterPage = () => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [username, setUsername] = useState('')
      const {signup, error, isLoading} = useSignup()
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Lösenorden matchar inte!"); // "Passwords do not match!"
            return;
        }

        console.log(email, username, password);
        const success = await signup(email, username, password);

        if (!success) {
            navigate("/profile");
        } 
};

     

  return (
    //Needs topbar without login
    <div className="wrapper">
      <div className="form-box register">
        <form className="signup" onSubmit={handleSubmit}>
          <h1 className='event-header'>REGISTRERA EN NY FÖRENING</h1>
          <h2>Ämnesföreningens namn</h2>
          <div className="input-box">
            <input 
            type="text" placeholder="Ämnesföreningens namn" required 
            onChange= {(e) => setUsername(e.target.value)}
            value={username}
            />
            <FaBuilding className="icon" /> 
          </div>


          <h2>Epost</h2>
          <div className="input-box">
            <input 
              type="email" placeholder="Epost" required 
              onChange= {(e) => setEmail(e.target.value)}
              value={email}
            />
            <FaEnvelope className="icon" />
          </div>

        
          <h2>Lösenord</h2>
          <div className="input-box">
            <input 
            type="password" placeholder="Lösenord" required 
            onChange= {(e) => setPassword(e.target.value)}
            value={password}
            />
            <FaLock className="icon" />
          </div>


          <h2>Bekräfta lösenord</h2>
          <div className="input-box">
            <input 
            type="password" placeholder="Bekräfta lösenord" required 
            onChange={(e) => setConfirmPassword(e.target.value)} // Use setConfirmPassword here
            value={confirmPassword} // Display confirmPassword state here
            />
            <FaLock className="icon" />
          </div>

          <div>
          <button 
            disabled={isLoading}
            className="register-button" 
            type="submit">   {/* Den här ska säkert ändras till en redirect */}
              Registrera      
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
