import { useEffect, useState } from 'react';
import EventCard from './EventCard';

export default function EventList() {
  const [events, setEvents] = useState([]);

  //fetch events from database
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5050/event/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }
    getEvents();
    return;
  }, [events.length]);


  //create EventCards for each event
  function eventList() {
    return events.map((event) => {
      return (
        <EventCard
        event={event}
        key={event._id}
        />
      );
    });
  }


  //return event list container with cards
  return (
    <div>
      <h2 className='event-header'>Kommande Evenemang</h2>
      <div className="event-list-container">
        {eventList()}
      </div>
    </div>

  );
}

