import React from 'react';
import '../styles/background.css';
import "../styles/LoginPage.css";
import BurgerMenu from '../components/BurgerMenu';

//This page is sharing css with loginpage!

const SAinfo = () => {
  return (
    <>
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
    </>       
  );
};

export default SAinfo;
