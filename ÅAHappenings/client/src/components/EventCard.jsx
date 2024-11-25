import { Link } from "react-router-dom";

export default function EventCard({event}) {

    return (
        <Link to={`/event/${event._id}`}>
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
        </Link>
    )
}