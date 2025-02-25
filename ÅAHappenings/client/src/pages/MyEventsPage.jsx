import React, { useState } from 'react';
import '../styles/background.css';
import Calendar from 'react-calendar';
import BurgerMenu from '../components/BurgerMenu';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';

export default function MyEvents(){

  const [apiEvents, setApiEvents] = useState([]);
  
  const [isOpen, setOpen] = useState(false);
  const handleOpenChange = (newValue) => {
    setOpen(newValue);
  }

  const [value, setValue] = useState(new Date());
  
  const handleDateChange = (newValue) => {
    setValue(newValue); // Update the selected date

    // Format the selected date
    const selectedDate = formatDateAsLocal(newValue);

    // Filter events based on the selected date
    const filteredByDate = apiEvents.filter(event => event.date === selectedDate);

    // Update the filtered events state
    setFilteredEvents(filteredByDate);
  };

  const getEventsForDate = (date) => {
    const formattedDate = formatDateAsLocal(date); // Format the date as local YYYY-MM-DD
    return apiEvents.filter(event => event.date === formattedDate); // Match against event dates
  };
  
  // Helper function to format a Date object as YYYY-MM-DD in local time
  const formatDateAsLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }; 

  // Render dots for tiles with events
  const renderTileContent = ({ date }) => {
    const events = getEventsForDate(date); // Get events for the current tile date
    if (events.length > 0) {
      let dotsToShow = events.length === 3 ? events : events.slice(0, 2); // Show 3 dots if exactly 3 events, otherwise 2 dots
      
      return (
        <div className="tile-dots">
          {dotsToShow.map((_, index) => (
            <span key={index} className="dot"></span>
          ))}
          {events.length > 3 && <span className="more-dots">+{events.length - 2}</span>} {/* Show +N if 4 or more */}
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <BurgerMenu />
    <div className="container">
      {/* Blurred background layer */}
      <div className="background-image"></div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5vw"}}>
      {/* Button to open the dialog */}
      <button onClick={() => setOpen(true)} className="button-style">Skapa Evenemang</button>
      <EventForm isOpen={isOpen} setOpen={handleOpenChange} isNew={true}/>
    </div>
      <div className="calendar-event-container">
          <Calendar
                  onChange={handleDateChange}
                  value={value}
                  className="react-calendar" /* Apply custom styling */
                  tileContent={renderTileContent} // Add tile content
                  locale="sv"
              />
      </div>
    </div>
    </div>
    </>
  );
}
