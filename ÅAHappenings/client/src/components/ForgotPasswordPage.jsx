import React from 'react';
import '../background.css';
import { FaEnvelope } from "react-icons/fa";
import "../ForgotPasswordPage.css";
import TopBarNoLogin from "./TopBarNoLogin";
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <>
      {/* Include the TopBar without Logga In button at the top of the page */}
      <TopBarNoLogin />
    
      <div className="container">
        {/* Blurred background*/}
        <div className="background-image"></div>
        
        {/* Main content*/}
        <div className="wrapper">
          <div className="form-box forgot-password">
            <form>
              <h1 className="event-header">Återställ lösenord</h1>

              <h2>Email</h2>
              <div className="input-box">
                <input type="email" placeholder="Ange din email" required />
                <FaEnvelope className="icon" />
              </div>

              <div>
                <button className="reset-button" type="submit">
                  Återställ
                </button>
              </div>

              <div className="back-to-login">
                <NavLink to="/login" className="back-button">
                  Tillbaka till inloggning
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;