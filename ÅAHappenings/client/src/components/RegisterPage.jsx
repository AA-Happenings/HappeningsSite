import React from 'react';
import '../background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import "../RegisterPage.css";
import TopBarNoLogin from "./TopBarNoLogin";
import  { useState} from 'react'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [username, setUsername] = useState('')
  
      const handleSubmit = async (e) => {
          e.preventDefault()
  
          console.log(email, username, password)
      } 

  return (
    <>
      {/* Include the TopBar without Logga In button at the top of the page */}
      <TopBarNoLogin />
    
      <div className="container">
        {/* Blurred background layer */}
        <div className="background-image"></div>
        
        {/* Main content overlay */}
        <div className="wrapper">
          <div className="form-box register">
            <form className="signup" onSubmit={handleSubmit}>
              <h1 className='event-header'>REGISTRERA MIG</h1>
              <h2>Ämnesförening</h2>
              <div className="input-box">
                <input 
                type="text" placeholder="Ämnesföreningens namn" required 
                onChange= {(e) => setUsername(e.target.value)}
                value={username}
                />
                <FaBuilding className="icon" /> 
              </div>


              <h2>Email</h2>
              <div className="input-box">
                <input 
                  type="email" placeholder="Email" required 
                  onChange= {(e) => setEmail(e.target.value)}
                  value={email}
                />
                <FaEnvelope className="icon" />
              </div>

            

              <h2>Bekräfta Lösenord</h2>
              <div className="input-box">
                <input 
                type="password" placeholder="Bekräfta Lösenord" required 
                onChange= {(e) => setPassword(e.target.value)}
                value={password}
                />
                <FaLock className="icon" />
              </div>

              <div>
                <button className="register-button" type="submit">
                  Registrera
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
