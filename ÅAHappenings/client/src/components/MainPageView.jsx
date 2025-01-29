import React, { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from './EventList';

export default function MainPageView() {

  //filter useState
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedAssociation, setSelectedAssociation] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);
  const [associationEvents, setAssociationEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5050/event/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setApiEvents(events);
      setFilteredEvents(events);
    }
    getEvents();
    return;
  }, []);

  //updating filters
  const handleFilterUpdate = (updatedFilters) => {
    setSelectedFilters(updatedFilters);
    const filtered = apiEvents.filter((event) => updatedFilters.every((tag) => event.tags.includes(tag)));
    setFilteredEvents(filtered);
  };

  //Available filters
  const availableFilters = {
    evenemangstyp: ["Sport", "Kultur", "Sittning", "Gratis"],
    taggar: ["Gulisevenemang", "BYOB", "Endast Medlemmar"],
    förening: ["Kemistklubben", "DaTe", "SF-Klubben", "Merkantila Klubben", "Humanistiska Föreningen"]
  };

  //Date values useState and date chane handler
  const [value, setValue] = useState(new Date());
  const handleDateChange = (newValue) => {
    setValue(newValue); // Update the selected date
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        margin: "10px",
      }}
    >
      {/* Filter Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2vw"}}>
        <FilterButton
          name="Evenemangstyp"
          availableFilters={availableFilters.evenemangstyp}
          selectedFilters={selectedFilters}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          name="Taggar"
          availableFilters={availableFilters.taggar}
          selectedFilters={selectedFilters}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          name="Förening"
          availableFilters={availableFilters.förening}
          selectedFilters={selectedFilters}
          onFilterUpdate={handleFilterUpdate}
        />
      </div>

      {/* Selected Filters */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {selectedFilters.map((filter) => (
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
                  handleFilterUpdate(selectedFilters.filter((f) => f !== filter))
                }
              >
                ✖
              </span>
            </div>
          ))
        }
      </div>
      <div className="calendar-event-container">
          <Calendar
                  onChange={handleDateChange}
                  value={value}
                  className="react-calendar" /* Apply custom styling */
              />
          <EventList events={filteredEvents}/>
      </div>
    </div>
  );
}
