import React, { useState, useEffect } from "react";
import "../styles/background.css";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [whitelist, setWhitelist] = useState([]); // Whitelisted emails
  const [emailInput, setEmailInput] = useState("");

  // Search state for each column
  const [usersSearch, setUsersSearch] = useState("");
  const [eventsSearch, setEventsSearch] = useState("");
  const [whitelistSearch, setWhitelistSearch] = useState("");

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

  // Filter lists based on search queries
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(usersSearch.toLowerCase())
  );

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(eventsSearch.toLowerCase())
  );

  const filteredWhitelist = whitelist.filter((email) =>
    email.toLowerCase().includes(whitelistSearch.toLowerCase())
  );

  return (
    <div>
      <div className="admin-title">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="admin-big-container">
        {/* Users Column */}
        <div className="column users-column">
        <h3>Users</h3>
          <input
            type="text"
            placeholder="Search Users"
            value={usersSearch}
            onChange={(e) => setUsersSearch(e.target.value)}
            className="search-bar"
          />
          <ul>
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="clickable-item"
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        {/* Events Column */}
        <div className="column events-column">
        <h3>Events</h3>
          <input
            type="text"
            placeholder="Search Events"
            value={eventsSearch}
            onChange={(e) => setEventsSearch(e.target.value)}
            className="search-bar"
          />
          <ul>
            {filteredEvents.map((event) => (
              <li
                key={event._id}
                onClick={() => handleEventClick(event._id)}
                className="clickable-item"
              >
                {event.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Whitelisted Emails Column */}
        <div className="column whitelist-column">
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
          <input
            type="text"
            placeholder="Search Emails"
            value={whitelistSearch}
            onChange={(e) => setWhitelistSearch(e.target.value)}
            className="search-bar"
          />
          <ul className="whitelist-list">
            {filteredWhitelist.map((email, index) => (
              <li key={index} className="whitelist-item">
                {email}
                <span
                  className="remove-btn"
                  onClick={() => removeFromWhitelist(email)}
                >
                  ✖
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
