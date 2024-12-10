import React from "react";

const Popup = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ✖
        </button>
        <h2>{event.title}</h2>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>
    </div>
  );
};

export default Popup;
