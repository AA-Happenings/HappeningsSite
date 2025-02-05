import React from 'react';
import '../styles/background.css';
import "../styles/LoginPage.css";
import BurgerMenu from '../components/BurgerMenu';
import TopBarNoLogin from "../components/TopBarNoLogin";

//This page is sharing css with loginpage!

const SAinfo = () => {
  return (
    <>
      <BurgerMenu />
      
      {/* Include the TopBar without Logga In button at the top of the page */}
      <TopBarNoLogin />
      
      <div className="container">
        {/* Blurred background layer */}
        <div className="background-image"></div>
        
        {/* Main content overlay */}
        <div className="wrapper">
          <div className="form-box infobox">
            {/* Image */}
            <img 
              src="your-image-url.jpg" 
              alt="Logo of the chosen student association" 
              className="info-image" 
            />
            <div className='namebox'>
                Name of the Student Association
            </div>
            
            {/* Textbox */}
            <div className='info-displaybox'>
                This is where info about the student associations will be displayed!
            </div>
          </div>
        </div>
      </div>
    </>       
  );
};

export default SAinfo;
