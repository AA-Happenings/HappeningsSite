import React from "react";
import TopBar from "./TopBar"; // Import the TopBar component



export default function FaqPage() {
  return (
    <div className="faq-page">
      {/* Top Bar */}
      <TopBar />
      {/* Main FAQ Content */}
      <div className="event-page">
        {/* Title */}
        <div className="event-title">
          <h1>Frequently Asked Questions</h1>
        </div>

        {/* FAQ Content */}
        <div className="event-content">
          {/* General Questions */}
          <div className="event-tldr-section">
            <h2 className="section-title">Frågor</h2>
            <div className="event-tldr">
              <p><strong>Vad är ÅA-Happenings?</strong></p>
              <p>ÅA-Happenings är en plattform för att upptäcka evenemang som ordnas av specialföreningar vid Åbo Akademi.</p>

              <p><strong>Behöver jag ett konto för att använda sidan?</strong></p>
              <p>Nej, endast evenemangsarrangörer behöver konto för att skapa nya evenemang.</p>

              <p><strong>Hur anmäler jag mig till ett evenemang?</strong></p>
              <p>I samband med evenemangsinformationen finns det en länk till evenemangets hemsida, där du kan anmäla dig.</p>

              <p><strong>Vem ansvarar över ÅA-Happenings?</strong></p>
              <p>Evenemangsarrangörer, alltså specialföreningar kan lägga till och modifiera evenemang på ÅA-Happenings. Själva administrationen av webbsidan sköts av *insert kanske Datateknologerna vid Åbo Akademi rf*.</p>
            </div>
          </div>

          {/* Contact and Support */}
          <div className="event-description-section">
            <h2 className="section-title">Kontakt till administratörerna</h2>
            <div className="event-description">
              <p>Om du har vidare frågor om ÅA-Happenings kan du vara i kontakt med oss via:</p>
              <p>Epost: support@aa-happenings.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
