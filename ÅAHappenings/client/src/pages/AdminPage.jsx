import React, { useState, useEffect } from "react";
import "../styles/background.css";
import "../styles/AdminPage.css";
import TopBarNoLogin from "../components/TopBarNoLogin";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [whitelist, setWhitelist] = useState([]); // Whitelisted emails
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    // Fetch Events from MongoDB
    fetch("http://localhost:5050/events/")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch Users from MongoDB
    fetch("http://localhost:5050/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleEventClick = (eventId) => {
    console.log("Clicked event:", eventId);
  };

  const handleUserClick = (userId) => {
    console.log("Clicked user:", userId);
  };

  // Add Email to Whitelist
  const addToWhitelist = () => {
    if (emailInput.trim() && !whitelist.includes(emailInput)) {
      setWhitelist([...whitelist, emailInput]);
      setEmailInput(""); // Clear input field
    }
  };

  // Remove Email from Whitelist
  const removeFromWhitelist = (email) => {
    setWhitelist(whitelist.filter((item) => item !== email));
  };

  return (
  <div>
    <div className="admin-title">
      <h2>Admin Dashboard</h2>
    </div>
    
    <div className="admin-container">
      <div className="lists-container">
        {/* Events List */}
        <div className="events-list">
          <h3>Events</h3>
          <ul>
            {events.map((event) => (
              <li key={event._id} onClick={() => handleEventClick(event._id)} className="clickable-item">
                {event.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Users List */}
        <div className="users-list">
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id} onClick={() => handleUserClick(user._id)} className="clickable-item">
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Whitelist Emails Section */}
      <div className="whitelist-container">
        <h3>Whitelisted Emails</h3>
        <div className="whitelist-input">
          <input
            type="email"
            placeholder="Enter email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button onClick={addToWhitelist}>Add</button>
        </div>
        <ul className="whitelist-list">
          {whitelist.map((email, index) => (
            <li key={index} className="whitelist-item">
              {email}
              <span className="remove-btn" onClick={() => removeFromWhitelist(email)}>✖</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default AdminPage;
