import React, { useState, useEffect } from "react";
import FilterButton from "../components/FilterButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from '../components/EventList';
import { NavLink } from "react-router-dom";
import "../styles/MainPageView.css"
import { useEventsContext } from "../hooks/useEventsContext";
import { sv } from "date-fns/locale";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MainPageView() {
  const { events, dispatch } = useEventsContext();
  const { user } = useAuthContext();

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssociations, setSelectedAssociations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now());

  // Available filters with förening (will be filled later)
  const [availableFilters, setAvailableFilters] = useState({
    evenemangstyp: ["Sport", "Kultur", "Sittning", "Mässa", "Allmän Tillställning", "Årsfest", "Parkhäng / Sykväll"],
    taggar: ["Gratis", "Gulisevenemang", "BYOB", "Endast Medlemmar", "Alkoholfritt"],
    förening: []
  });

  // Users state (organizers)
  const [users, setUsers] = useState([]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () =>  {
      const response = await fetch("http://localhost:5050/event");
      const json = await response.json();

      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      dispatch({ type: "SET_EVENTS", payload: json });
      setFilteredEvents(json);
    }
    fetchEvents();
  }, [dispatch]);

  // Filter events when search, tags, or associations change
  useEffect(() => {
    const search_filtered = textSearchFilter(events);
    const association_filtered = selectedAssociationsFilter(search_filtered);
    const tag_filtered = filterByTags(association_filtered);
    setFilteredEvents(tag_filtered);
  }, [searchQuery, selectedTags, selectedAssociations]);

  const textSearchFilter = (eventsToFilter) => {
    if (searchQuery.length !== 0) {
      return eventsToFilter.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return eventsToFilter;
  };

  const selectedAssociationsFilter = (eventsToFilter) => {
    if (selectedAssociations.length !== 0) {
      return eventsToFilter.filter(event =>
        selectedAssociations.some(
          (association) => event.username === association
        )
      );
    }
    return eventsToFilter;
  };
  
  

  const filterByTags = (eventsToFilter) => {
    if (selectedTags.length !== 0) {
      return eventsToFilter.filter((event) =>
        selectedTags.every((tag) => event.tags.includes(tag))
      );
    }
    return eventsToFilter;
  };

  // Fetch organizers (users) and update förening filter
  useEffect(() => {
    const fetchUsers = async () =>  {
      const response = await fetch("http://localhost:5050/organizer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      setUsers(json);
      // Update availableFilters.förening with the usernames from the fetched users
      setAvailableFilters(prev => ({
        ...prev,
        förening: json.map(u => u.username)
      }));
    };
    
    fetchUsers();
    
  }, [user]);

  // Date state and handlers
  const [value, setValue] = useState(new Date());
  const handleDateChange = (newValue) => {
    setValue(newValue);
    const selectedDate = formatDateAsLocal(newValue);
    const filteredByDate = events.filter(event => event.date === selectedDate);
    setFilteredEvents(filteredByDate);
  };

  const handleClearDates = () => {
    const today = new Date();
    setValue(today);
    setFilteredEvents(events);
    setCalendarKey(Date.now());
  };

  const getEventsForDate = (date) => {
    const formattedDate = formatDateAsLocal(date);
    return events.filter(event => event.date === formattedDate);
  };

  const formatDateAsLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderTileContent = ({ date }) => {
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      let dotsToShow = dateEvents.length === 3 ? dateEvents : dateEvents.slice(0, 2);
      const colorByUsername = new Map(users.map(u => [u.username, u.color]));
      return (
        <div className="tile-dots">
          {dotsToShow.map((event, index) => {
            // Look up color from the user array; default to black if not found
            const dotColor = colorByUsername.get(event.username) || "black";
            return (
              <span 
                key={index} 
                className="dot" 
                style={{ backgroundColor: dotColor }}
              />
            );
          })}
          {dateEvents.length > 3 && (
            <span className="more-dots">
              +{dateEvents.length - 2}
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  function tileBorder({ date, view }) {
    if (view !== "month") return "";
  
    const dateEvents = getEventsForDate(date);
    if (!dateEvents || dateEvents.length === 0) return "";
  
    const validAOs = ["K", "MK", "F", "B"];
    const aoOrder = { K: 0, MK: 1, F: 2, B: 3 };
  
    // Collect unique AOs
    const uniqueAOs = Array.from(
      new Set(
        dateEvents
          .filter((e) => validAOs.includes(e.ao))
          .map((e) => e.ao)
      )
    );
  
    if (uniqueAOs.length === 0) return "";
  
    // Sort so we get consistent ordering (K < MK < F < B)
    uniqueAOs.sort((a, b) => aoOrder[a] - aoOrder[b]);
  
    // e.g., "tile-border-segments-K-F"
    const comboClass = "tile-border-segments-" + uniqueAOs.join("-");
  
    // Return BOTH classes:
    return `tile-border-segments ${comboClass}`;
  }
  
  
  
  return (
    <div className="main-container">
      <div>
        <div className="search-filter-container">
          { formatDateAsLocal(value) !== formatDateAsLocal(new Date()) && (
            <button 
              onClick={handleClearDates} 
              style={{
                marginRight: "1rem", 
                padding: "10px 15px", 
                borderRadius: "8px", 
                border: "1px solid #ccc", 
                background: "#fff",
                cursor: "pointer"
              }}
            >
              Rensa datum ✖
            </button>
          )}
          <div className="search-container">
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
            />
          </div>
          <div className="filters-container">
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
        </div>
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
          ))}
          {selectedAssociations.map((filter) => (
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
          ))}
        </div>
        <div className="calendar-event-container">
          <Calendar
            key={calendarKey}
            onChange={handleDateChange}
            value={value}
            className="react-calendar"
            tileContent={renderTileContent}
            tileClassName={tileBorder}
            locale="sv"
          />
          {filteredEvents && <EventList events={filteredEvents} />}
        </div>
        <div className="faq-container">
          <NavLink to="/faq" className="faq-button">
            FAQ
          </NavLink>
        </div>
      </div>
    </div>
  );
}
