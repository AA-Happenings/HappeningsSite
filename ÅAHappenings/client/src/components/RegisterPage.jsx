import React from 'react';
import '../background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import "../RegisterPage.css";
import TopBarNoLogin from "./TopBarNoLogin";

const RegisterPage = () => {
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
            <form>
              <h1 className='event-header'>REGISTRERA MIG</h1>
              <h2>Email</h2>
              <div className="input-box">
                <input type="email" placeholder="Email" required />
                <FaEnvelope className="icon" />
              </div>

              <h2>Lösenord</h2>
              <div className="input-box">
                <input type="password" placeholder="Lösenord" required />
                <FaLock className="icon" />
              </div>

              <h2>Bekräfta Lösenord</h2>
              <div className="input-box">
                <input type="password" placeholder="Bekräfta Lösenord" required />
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
