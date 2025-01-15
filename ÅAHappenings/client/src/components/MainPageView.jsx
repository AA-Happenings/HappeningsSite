import React, { useState } from "react";
import FilterButton from "./FilterButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from './EventList';

export default function MainPageView() {

  //filter useState
  const [allFilters, setAllFilters] = useState({
    evenemangstyp: [],
    taggar: [],
    förening: [],
  });

  //updating filters
  const handleFilterUpdate = (position, updatedFilters) => {
    setAllFilters((prev) => ({
      ...prev,
      [position]: updatedFilters,
    }));
  };

  //Available filters
  const availableFilters = {
    evenemangstyp: ["Sport", "Kultur", "Sittning", "Gratis"],
    taggar: ["Gulisevenemang", "BYOB", "Endast Medlemmar"],
    förening: ["Kemistklubben", "SF-Klubben", "Merkantila Klubben", "Humanistiska Föreningen"],
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
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2vw" , marginTop: '4.2vw'}}>
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
          <EventList />
      </div>
    </div>
  );
}
