import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="navbar">
      {/* Title that links to the homepage */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Button to navigate to the /create page */}
      <div className="navbar-buttons">
        <NavLink to="/create" className="login-button">
          Logga in
        </NavLink>
      </div>
    </div>
  );
}

  