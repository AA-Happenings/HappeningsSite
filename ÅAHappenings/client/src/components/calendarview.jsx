import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventList from './EventList';
import React, { useState } from "react";


export default function CalendarView() {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (newValue) => {
    setValue(newValue); // Update the selected date
  };

  return (
    <div className="main-container">
      <div className="calendar-event-container">
        <div className="calendar-container">
          <Calendar
                  onChange={handleDateChange}
                  value={value}
                  className="react-calendar" /* Apply custom styling */
              />
        </div>
        <div>
            <EventList />
        </div>
    </div>
</div>

  );
}
