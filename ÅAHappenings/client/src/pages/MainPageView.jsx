import React, { useState, useEffect } from "react";
import FilterButton from "../components/FilterButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from '../components/EventList';
import { NavLink } from "react-router-dom";
import "../styles/MainPageView.css"
import { sv } from "date-fns/locale";

export default function MainPageView() {

  //filter useState
  const [apiEvents, setApiEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssociations, setSelectedAssociations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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

  //filters every time searchquery, tags or association is updated
  useEffect(() => {
    const search_filtered = textSearchFilter(apiEvents);
    const association_filtered = selectedAssociationsFilter(search_filtered);
    const tag_filtered = filterByTags(association_filtered);
    console.log(searchQuery);
    setFilteredEvents(tag_filtered);
  }, [searchQuery, selectedTags, selectedAssociations]);

  //filter by searchquery
  const textSearchFilter = (eventsToFilter) => {
    if(searchQuery.length != 0) {
      return eventsToFilter.filter((event) => (event.title.toLowerCase()).includes(searchQuery.toLowerCase()));
    }
    return eventsToFilter;
  }

  //filters by association
  const selectedAssociationsFilter = (eventsToFilter) => {
    if(selectedAssociations.length != 0) {
      return eventsToFilter.filter((event) => selectedAssociations.some((association) => event.tags.includes(association)));
    }
    return eventsToFilter;
  }

  //filters by tags
  const filterByTags = (eventsToFilter) => {
    if(selectedTags.length != 0) {
      return eventsToFilter.filter((event) => selectedTags.every((tag) => event.tags.includes(tag)));
    }
    return eventsToFilter;
  }

  //Available filters
  const availableFilters = {
    evenemangstyp: ["sport", "kultur", "sittning", "gratis"],
    taggar: ["Gulisevenemang", "BYOB", "Endast Medlemmar"],
    förening: ["KK", "DaTe", "SF-Klubben", "MK", "Humanistiska Föreningen"]
  };

  //Date values useState and date chane handler
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
      <div
          style={{
            display: "inline-block",
            margin: "0 10px",
            position: "relative",
          }}
        >
        <input 
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
          placeholder="Type to search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
        </input>
      </div>
        <FilterButton
          name="Evenemangstyp"
          availableFilters={availableFilters.evenemangstyp}
          selectedFilters={selectedTags}
          onFilterUpdate={setSelectedTags}
        />
        <FilterButton
          name="Taggar"
          availableFilters={availableFilters.taggar}
          selectedFilters={selectedTags}
          onFilterUpdate={setSelectedTags}
        />
        <FilterButton
          name="Förening"
          availableFilters={availableFilters.förening}
          selectedFilters={selectedAssociations}
          onFilterUpdate={setSelectedAssociations}
        />
      </div>

      {/* Selected Filters */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {selectedTags.map((filter) => (
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
                  setSelectedTags(selectedTags.filter((f) => f !== filter))
                }
              >
                ✖
              </span>
            </div>
          ))
        }
        {
          selectedAssociations.map((filter) => (
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
                  setSelectedAssociations(selectedAssociations.filter((a) => a !== filter))
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
                  tileContent={renderTileContent} // Add tile content
                  locale="sv"
              />
          <EventList events={filteredEvents}/>
      </div>
      <div className="faq-container">
        <NavLink to="/faq" className="faq-button">
          FAQ
        </NavLink>
    </div>
    </div>
    
  );
}
