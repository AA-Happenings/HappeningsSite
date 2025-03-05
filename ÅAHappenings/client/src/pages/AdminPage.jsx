import React, { useState, useEffect } from "react";
import "../styles/background.css";
import "../styles/AdminPage.css";
import { useEventsContext } from "../hooks/useEventsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminPage = () => {
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const {events, dispatch} = useEventsContext();
  const [users, setUsers] = useState([]);
  const [whitelist, setWhitelist] = useState([]); // Whitelisted emails
  const [emailInput, setEmailInput] = useState("");

  // Search state for each column
  const [usersSearch, setUsersSearch] = useState("");
  const [eventsSearch, setEventsSearch] = useState("");
  const [whitelistSearch, setWhitelistSearch] = useState("");

  // useStates for filtered stuff
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredWhitelists, setFilteredWhitelists] = useState([]);


  //fetch events, users and whitelists from db
  useEffect(() => {

    //event fetch
    const fetchEvents = async () =>  {
      const response = await fetch("http://localhost:5050/event");
      console.log(response)
      const json = await response.json();

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      dispatch({type: "SET_EVENTS", payload: json})
      setFilteredEvents(json);
    }

    //user fetch
    const fetchUsers = async () =>  {
      const response = await fetch("http://localhost:5050/organizer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });
      console.log(response)
      const json = await response.json();

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      setFilteredUsers(json);
      setUsers(json);
    }

    //whitelist fetch
    const fetchWhitelist = async () =>  {
      const response = await fetch("http://localhost:5050/whitelist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });
      console.log(response)
      const json = await response.json();

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      setFilteredWhitelists(json);
      setWhitelist(json);
    }

    fetchEvents();
    fetchUsers();
    fetchWhitelist();
    return;
  }, [dispatch]);

  //userfiltering
  useEffect(() => {
    const filtered = userSearchFilter(users);
    setFilteredUsers(filtered);
  }, [usersSearch]);

  const userSearchFilter = (usersToFilter) => {
    if(usersSearch.length != 0) {
      return usersToFilter.filter((user) => (user.username).toLocaleLowerCase().includes(usersSearch.toLocaleLowerCase()));
    }
    return usersToFilter;
  }

  //eventfiltering
  useEffect(() => {
    const filtered = eventSearchFilter(events);
    setFilteredEvents(filtered);
  }, [eventsSearch]);

  const eventSearchFilter = (eventsToFilter) => {
    if(eventsSearch.length != 0) {
      return eventsToFilter.filter((event) => (event.title).toLocaleLowerCase().includes(eventsSearch.toLocaleLowerCase()));
    }
    return eventsToFilter;
  }

  //whitelist filtering
  useEffect(() => {
    const filtered = whitelistSearchFilter(whitelist)
    setFilteredWhitelists(filtered);
  }, [whitelistSearch]);

  const whitelistSearchFilter = (whitelistsToFilter) => {
    if(whitelistSearch.length != 0) {
      return whitelistsToFilter.filter((wl) => (wl.email).toLocaleLowerCase().includes(whitelistSearch.toLocaleLowerCase()));
    }
    return whitelistsToFilter;
  }


  // Add Email to Whitelist
  const addToWhitelist = async () => {
    if (emailInput.trim() && !whitelist.includes(emailInput)) {
      const email = emailInput;
      const response = await fetch("http://localhost:5050/whitelist/add", {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      });
      console.log(response);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
      }
      setEmailInput(""); // Clear input field
    }
  };

  // Remove Email from Whitelist
  const removeFromWhitelist = async (email) => {
    const response = await fetch("http://localhost:5050/whitelist/remove", {
      method: "DELETE",
      body: JSON.stringify({email}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    });
    console.log(response);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
  };


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
            {filteredUsers && filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => navigate(`/profile/${user._id}`)}
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
            {filteredEvents && filteredEvents.map((event) => (
              <li
                key={event._id}
                onClick={() => navigate(`/event/${event._id}`)}
                className="clickable-item"
              >
                {event.title}
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
          <ul >
            {filteredWhitelists && filteredWhitelists.map((emailIdPair) => (
              <li key={emailIdPair._id} className="whitelist-item">
                {emailIdPair.email}
                <span
                  className="remove-btn"
                  onClick={() => removeFromWhitelist(emailIdPair.email)}
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
