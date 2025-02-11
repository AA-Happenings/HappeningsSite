import React, { useState } from 'react';
import '../styles/background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../styles/LoginPage.css";
import { NavLink } from "react-router-dom" /* for linking to Forgot Password page */

const LoginPage = () => {
  return (
    //Needs topbar without login
    <div className="wrapper">
      <div className="form-box login">
        <form action="">
          <h2>Email</h2>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <FaUser className="icon"/>
          </div>
          <h2>Lösenord</h2>
          <div className="input-box">
            <input type="password" placeholder='Lösenord' required />
            <FaLock className="icon"/>
          </div>
          <div>
            <button className="loggain-button" type="button">
              Logga in
            </button>
            <div className="forgot-password-link">
            <NavLink to="/forgot-password" className="i_forgor">
              Glömt lösenordet?
            </NavLink>
            </div>
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
