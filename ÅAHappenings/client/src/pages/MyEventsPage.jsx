import React, { useState } from 'react';
import '../styles/background.css';
import Calendar from 'react-calendar';
import BurgerMenu from '../components/BurgerMenu';
import 'react-calendar/dist/Calendar.css';
import TopBarLoggedIn from "../components/TopBarLoggedIn";
import EventForm from '../components/EventForm';

export default function MyEvents(){
  
  const [isOpen, setOpen] = useState(false);
  const handleOpenChange = (newValue) => {
    setOpen(newValue);
  }

  const [value, setValue] = useState(new Date());
  
    const handleDateChange = (newValue) => {
      setValue(newValue); // Update the selected date
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
              />
      </div>
    </div>
    </div>
    </>
  );
}
