import React, { useState, useEffect } from 'react';
import '../styles/background.css';
import Calendar from 'react-calendar';
import BurgerMenu from '../components/BurgerMenu';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyEvents() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Redirect to the main page if the user is logged out.
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [apiEvents, setApiEvents] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleOpenChange = (newValue) => {
    setOpen(newValue);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);

    // Format the selected date
    const selectedDate = formatDateAsLocal(newValue);

    // Filter events based on the selected date
    const filteredByDate = apiEvents.filter(event => event.date === selectedDate);
    setFilteredEvents(filteredByDate);
  };

  const getEventsForDate = (date) => {
    const formattedDate = formatDateAsLocal(date);
    return apiEvents.filter(event => event.date === formattedDate);
  };

  // Helper to format Date as YYYY-MM-DD in local time.
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
          <button onClick={() => setOpen(true)} className="button-style">
            Skapa Evenemang
          </button>
          <EventForm isOpen={isOpen} setOpen={handleOpenChange} isNew={true} />
        </div>
        <div className="calendar-event-container">
          <Calendar
            onChange={handleDateChange}
            value={value}
            className="react-calendar"
            tileContent={renderTileContent}
            locale="sv"
          />
        </div>
      </div>
    </>
  );
}
