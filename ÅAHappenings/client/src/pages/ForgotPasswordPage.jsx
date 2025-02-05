import React from 'react';
import '../styles/background.css';
import { FaEnvelope } from "react-icons/fa";
import "../styles/ForgotPasswordPage.css";
import TopBarNoLogin from "../components/TopBarNoLogin";
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    //Needs topbar no login
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
  );
};

export default ForgotPasswordPage;