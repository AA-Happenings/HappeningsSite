import React, { useState } from 'react';
import '../background.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../LoginPage.css";

const LoginPage = () => {
  return (
    <div className="container">
      {/* Blurred background layer */}
      <div className="background-image"></div>

      {/* Main content overlay */}
        <div className="wrapper">
          <div className="form-box login">
            <form action="">
              <h1>Login</h1>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon"/>
              </div>
              <div className="input-box">
                <input type="password" placeholder='Password' required />
                <FaLock className="icon"/>
              </div>
            </form>
          </div>
        </div>
      </div>        
  );
};


export default LoginPage;
