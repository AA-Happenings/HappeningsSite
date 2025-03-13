import { Link } from "react-router-dom";

const EventCard = (props) => (
  <Link to={`/event/${props.event._id}`}>
              <div className="event-card">
              <div className="event-icon">
                  📅 {/* You can replace this with an actual icon if desired */}
              </div>
              <div className="event-details">
                  <h3>{props.event.title}</h3>
                  <p className="event-location">{props.event.location}</p>
                  <p className="event-time">
                  🕒 {props.event.date} - {props.event.time}
                  </p>
                  {props.event.membersOnly === "true" && (
            <p className="members-only">Endast för medlemmar!</p>
          )}
              </div>
              </div>
          </Link>
);

const EventList = ({ events }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates

  // Filter out past events (ignore time)
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);

  // Sort only by date (ignores time)
  const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="event-list-container">
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event) => <EventCard event={event} key={event._id} />)
      ) : (
        <p>No upcoming events</p>
      )}
    </div>
  );
};


export default EventList;