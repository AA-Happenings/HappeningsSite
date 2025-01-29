import React, { useState } from 'react';
import '../background.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from './EventList';
import FilterButton from "./FilterButton";
import TopBarLoggedIn from "./TopBarLoggedIn";
import { Dialog } from 'react-dialog-element';

export default function LoggedInUser(){
  const [allFilters, setAllFilters] = useState({
    evenemangstyp: [],
    taggar: [],
    förening: [],
  });

  const [isOpen, setOpen] = useState(false);

  const handleFilterUpdate = (position, updatedFilters) => {
    setAllFilters((prev) => ({
      ...prev,
      [position]: updatedFilters,
    }));
  };

  const [value, setValue] = useState(new Date());
  
    const handleDateChange = (newValue) => {
      setValue(newValue); // Update the selected date
    };

  const availableFilters = {
    evenemangstyp: ["Sport", "Kultur", "Sittning", "Gratis"],
    taggar: ["Gulisevenemang", "BYOB", "Endast Medlemmar"],
    förening: ["Kemistklubben", "SF-Klubben", "Merkantila Klubben", "Humanistiska Föreningen"],
  };

  return (
    <>
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

            {/* Members Only Checkbox */}
            <div className="dialog-checkbox">
              <input type="checkbox" id="members-only" />
              <label htmlFor="members-only">Endast för medlemmar</label>
            </div>

            {/* Date Section */}
            <div className="dialog-date">
              <label className="dialog-label" htmlFor="date">*Välj datum</label>
              <input required type="datetime-local" id="date" className="dialog-input" format-value="yyyy-MM-ddThh:mm" />
            </div>
            </div>
            <div className="item-container-right">
              {/* Co-organizer Dropdown */}
              <label className="dialog-label">Välj medorganisatör</label>
              <select className="dialog-select">
                <option value="">Välj</option>
                {/* Add more options dynamically if needed */}
              </select>

              {/* Location Field */}
            <label className="dialog-label">Plats:</label>
            <input type="text" placeholder="Ange platsen för ditt evenemang" className="dialog-input" />

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
      {/* Filter Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2vw"}}>
        <FilterButton
          position="Evenemangstyp"
          availableFilters={availableFilters.evenemangstyp}
          selectedFilters={allFilters.evenemangstyp}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          position="Taggar"
          availableFilters={availableFilters.taggar}
          selectedFilters={allFilters.taggar}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          position="Förening"
          availableFilters={availableFilters.förening}
          selectedFilters={allFilters.förening}
          onFilterUpdate={handleFilterUpdate}
        />
      </div>

      {/* Selected Filters */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {Object.entries(allFilters).map(([position, filters]) =>
          filters.map((filter) => (
            <div
              key={filter}
              style={{
                display: "inline-block",
                margin: "4px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "#f5f5f5",
                border: "1px solid #ddd",
              }}
            >
              {filter}
              <span
                style={{
                  marginLeft: "8px",
                  color: "#888",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  handleFilterUpdate(
                    position,
                    filters.filter((f) => f !== filter)
                  )
                }
              >
                ✖
              </span>
            </div>
          ))
        )}
      </div>
      <div className="calendar-event-container">
          <Calendar
                  onChange={handleDateChange}
                  value={value}
                  className="react-calendar" /* Apply custom styling */
              />
          <EventList
            filters={allFilters}
          />
      </div>
    </div>
    </div>
    </>
  );
}


