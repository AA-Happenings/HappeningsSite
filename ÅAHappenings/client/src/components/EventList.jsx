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
              </div>
              </div>
          </Link>
);

const EventList = ({ events }) => {
  const today = new Date(); // Get the current date

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today) // Remove past events
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)); // Sort by date & time

  return (
    <div className="event-list-container">
      {
        upcomingEvents.map((event) => <EventCard event={event} key={event._id} />)
      }
    </div>
  );
};


export default EventList;