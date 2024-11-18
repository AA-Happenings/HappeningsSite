import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import EventList from './EventList';

export default function CalendarView() {
  return (
    <div style={{display: 'flex'}}>
      <Calendar />
      <EventList />
    </div>
  );
}
