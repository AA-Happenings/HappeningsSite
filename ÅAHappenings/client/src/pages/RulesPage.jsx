import React from "react";
import BurgerMenu from '../components/BurgerMenu';
import "../styles/RulesPage.css"; // Import the corresponding CSS file

const RulesPage = () => {
  return (
    <>

    <div className="rules-page">
      {/* Main Rules Content */}
      <div className="event-page">




          {/* Submission Guidelines Section */}
          <div className="event-description-section">
            <h2 className="section-title">Regler</h2>
            <div className="event-description">
              <p><strong>-</strong> Nämn inte alkohol i någon form i evenemangsbeskrivningen</p>
              <p><strong>-</strong> Nämn inte explicit "AÖ"</p>
              <p><strong>-</strong> Kom ihåg att evenemang på denna sida kan ses av vem som helst</p>
              <p><strong>-</strong> Administratörerna behåller rätten att ta bort evenemang som anses strida mot dessa regler</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RulesPage;
