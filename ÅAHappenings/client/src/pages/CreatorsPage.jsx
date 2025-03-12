import React from "react";

export default function CreatorsPage() {
  return (
    <div className="faq-page">
      {/* Top Bar */}
      
      {/* Main Creator Page Content */}
      <div className="event-page">
        {/* Title */}
        <div className="event-title">
          <h1>The Creators</h1>
        </div>

        {/* FAQ Content */}
        <div className="event-content">
          {/* General Questions */}
          <div className="faq-section">
            <div className="faq-content" style={{fontSize:"1.5rem", width:"70rem", marginLeft:"auto", marginRight:"auto"}}>
              <p>ÅA-Happenings was created as part of the Project Course 2024-2025, held by Åbo Akademi.
                The site was created by Oscar Sundfors, Rasmus Vilén, Jonathan Johansson, Thomas Segercrantz,
                 Anton Näsman, Erik Malmström and Kalle Fjäder. The site is maintained by the creators, as well as 
                 Datateknologerna vid Åbo Akademi rf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
