import React, { useState, useEffect } from 'react';
import '../styles/background.css';
import Calendar from 'react-calendar';
import BurgerMenu from '../components/BurgerMenu';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MyEventsPage.css';

export default function MyEvents() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [apiEvents, setApiEvents] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now());

  // Fetch events and filter them for the logged-in user
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5050/event");
        const json = await response.json();
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }
        // Client-side filtering: Only include events owned by the logged-in user.
        // Assuming each event has a user_id property.
        const myEvents = json.filter(event => user && event.user_id === user._id);
        setApiEvents(myEvents);
        setFilteredEvents(myEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const handleOpenChange = (newValue) => {
    setOpen(newValue);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);

    // Format the selected date
    const selectedDate = formatDateAsLocal(newValue);

    // Filter events based on the selected date from the already filtered apiEvents.
    const filteredByDate = apiEvents.filter(event => event.date === selectedDate);
    setFilteredEvents(filteredByDate);
  };

  const getEventsForDate = (date) => {
    const formattedDate = formatDateAsLocal(date);
    return apiEvents.filter(event => event.date === formattedDate);
  };

  // Handler to clear the date filter
  const handleClearDates = () => {
    const today = new Date();
    setValue(today);
    setFilteredEvents(apiEvents);
    setCalendarKey(Date.now());
  };

  // Helper to format a Date object as YYYY-MM-DD in local time.
  const formatDateAsLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderTileContent = ({ date }) => {
    const events = getEventsForDate(date);
    if (events.length > 0) {
      const dotsToShow = events.length === 3 ? events : events.slice(0, 2);
      return (
        <div className="tile-dots">
          {dotsToShow.map((_, index) => (
            <span key={index} className="dot"></span>
          ))}
          {events.length > 3 && <span className="more-dots">+{events.length - 2}</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5vw" }}>
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
          <button onClick={() => setOpen(true)} className="create-event-button">
            Skapa Evenemang
          </button>
          <EventForm isOpen={isOpen} setOpen={handleOpenChange} isNew={true} />
        </div>
        <div className="calendar-event-container">
          <Calendar
            key={calendarKey}
            onChange={handleDateChange}
            value={value}
            className="react-calendar" /* Apply custom styling */
            tileContent={renderTileContent} // Add tile content
            locale="sv"
          />
          <EventList events={filteredEvents} />
        </div>
      </div>
    </>
  );
}
