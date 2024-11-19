import React from 'react';

const events = [
  {
    title: 'MK Gulistagning',
    location: 'Campusområdet, start: ASA',
    date: '6.9',
    time: '16:00',
  },
  {
    title: 'DaTe Sångsitz',
    location: 'F',
    date: '20.9',
    time: '18:30',
  },
  {
    title: 'ASK Motionstur',
    location: 'Puolalaskolan, Coolgatan 7',
    date: '25.9',
    time: '20:00',
  },
  {
    title: 'RÅA Live',
    location: 'Kåren, Tavastgatan 22',
    date: '4-5.10',
    time: '00:00',
  },
];

const EventCard = ({ event }) => (
  <div className="event-card">
    <div className="event-icon">
      📅 {/* You can replace this with an actual icon if desired */}
    </div>
    <div className="event-details">
      <h3>{event.title}</h3>
      <p className="event-location">{event.location}</p>
      <p className="event-time">
        🕒 {event.date} - {event.time}
      </p>
    </div>
  </div>
);

const EventList = () => (
  <div className="event-list-container">
    <h2>Kommande Evenemang</h2>
    {events.map((event, index) => (
      <EventCard key={index} event={event} />
    ))}
  </div>
);

export default EventList;
