import React from "react";
import '../styles/background.css';
import TopBarLoggedIn from "../components/TopBarLoggedIn";
import BurgerMenu from '../components/BurgerMenu';
import "../styles/RulesPage.css"; // Import the corresponding CSS file

const RulesPage = () => {
  return (
    <>
      <BurgerMenu />
      
      <TopBarLoggedIn />

      <div className="background-image"></div>

    <div className="rules-page">
      {/* Main Rules Content */}
      <div className="event-page">
        {/* Title */}
        <div className="event-title">
          <h1>Regler</h1>
        </div>


          {/* Submission Guidelines Section */}
          <div className="event-description-section">
            <h2 className="section-title">Submission Guidelines</h2>
            <div className="event-description">
              <p><strong>1:</strong> Inget nämnande av alkohol i evenemangsbeskrivningen</p>
              <p><strong>2:</strong> Inget nämnande av AÖ</p>
              <p><strong>3:</strong> yadayadayada</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RulesPage;
