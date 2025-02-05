import React, { useState } from 'react';
import '../styles/background.css';
import Calendar from 'react-calendar';
import BurgerMenu from '../components/BurgerMenu';
import 'react-calendar/dist/Calendar.css';
import TopBarLoggedIn from "../components/TopBarLoggedIn";
import { Dialog } from 'react-dialog-element';

export default function MyEvents(){
  
  const [isOpen, setOpen] = useState(false);

  const [value, setValue] = useState(new Date());
  
    const handleDateChange = (newValue) => {
      setValue(newValue); // Update the selected date
    };

  return (
    <>
    <BurgerMenu />
    <TopBarLoggedIn />
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

      {/* Dialog component */}
      {isOpen && (
        <Dialog isOpen={isOpen} setOpen={setOpen} style={{borderRadius: "10px"}}>
          <h1 className="dialog-header">Skapa Evenemang</h1>
          <div className="dialog-container">
            <div className="item-container-left">

            {/* Title Field */}
            <label className="dialog-label">*Rubrik:</label>
            <input required type="text" placeholder="Ge ditt evenemang ett namn" className="dialog-input" />

            {/* Description Field */}
            <label className="dialog-label">Beskrivning:</label>
            <textarea placeholder="Ge ditt evenemang en beskrivning" className="dialog-textarea"></textarea>

            {/* Price Field */}
            <label className="dialog-label">Pris:</label>
            <input type="text" placeholder="Ange priset för ditt evenemang" className="dialog-input" />

            {/* Location Field */}
            <label className="dialog-label">Plats:</label>
            <input type="text" placeholder="Ge platsen för ditt evenemang" className="dialog-input" />

            {/* How Field */}
            <label className="dialog-label">Hur:</label>
            <input type="text" placeholder="Ge ett tema/dresscode" className="dialog-input" />

            {/* Link Field */}
            <label className="dialog-label">Länk:</label>
            <input type="text" placeholder="Lägg till en länk" className="dialog-input" />
            </div>

            <div className="item-container-right">
              {/* Co-organizer Dropdown */}
            <label className="dialog-label">Välj medorganisatör</label>
              <select className="dialog-select">
                <option value="">Välj</option>
                {/* Add more options dynamically if needed */}
              </select>

              {/* Members Only Checkbox */}
            <div className="dialog-checkbox">
              <input type="checkbox" id="members-only" />
              <label htmlFor="members-only">Endast för medlemmar</label>
            </div>

            {/* Date Section */}
            <div className="dialog-date">
              <label className="dialog-label" htmlFor="date">*Välj datum</label>
              <input required type="date" id="date" className="dialog-input" format-value="yyyy-MM-dd" />
            </div>

            {/* Time Field */}
            <label className="dialog-label">Tid:</label>
            <input type="text" placeholder="Ge ett klockslag" className="dialog-input" />

              {/* Checkbox Options */}
              <div className="dialog-checkbox-container">
              <div className="dialog-checkbox">
                  <input type="checkbox" id="sport" />
                  <label htmlFor="sport">Sport</label>
                </div>
                <div className="dialog-checkbox">
                  <input type="checkbox" id="kultur" />
                  <label htmlFor="kultur">Kultur</label>
                </div>
                <div className="dialog-checkbox">
                  <input type="checkbox" id="sittning" />
                  <label htmlFor="sittning">Sittning</label>
                </div>
                <div className="dialog-checkbox">
                  <input type="checkbox" id="gulisevenemang" />
                  <label htmlFor="gulisevenemang">Gulisevenemang</label>
                </div>
                <div className="dialog-checkbox">
                  <input type="checkbox" id="byob" />
                  <label htmlFor="byob">BYOB</label>
                </div>
                <div className="dialog-checkbox">
                  <input type="checkbox" id="gratis" />
                  <label htmlFor="gratis">Gratis</label>
                </div>
                {/* Add other checkboxes following the same pattern */}
              </div>

            </div>
          </div>
          {/* Buttons */}
          <div className="dialog-buttons">
              <button onClick={() => setOpen(false)} className="button-style-cancel">Avbryt</button>
              <button onClick={() => console.log("Event Created!")} className="button-style">Skapa evenemang</button>
            </div>
        </Dialog>
      )}
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
