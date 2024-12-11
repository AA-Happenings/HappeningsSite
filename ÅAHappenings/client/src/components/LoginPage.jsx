import React, { useState } from 'react';
import '../background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../LoginPage.css";
import TopBarNoLogin from "./TopBarNoLogin";

const LoginPage = () => {
  return (
    <>
      {/* Include the TopBar without Logga In button at the top of the page */}
      <TopBarNoLogin />
    
    <div className="container">
      {/* Blurred background layer */}
      <div className="background-image"></div>
      
      {/* Main content overlay */}
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
                <div>
                <button className="i_forgor" type="button">
                  Glömt lösenordet?
                </button>
                </div>
              </div>
            </form>
          </div>
          <div className="disclaimer">
              Inloggning enbart menad för arrangörer och organisationer, användare behöver inte logga in.
            </div>
        </div>
      </div> 
      </>       
  );
};


export default LoginPage;
