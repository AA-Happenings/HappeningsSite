import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="navbar">
        {/* Regler Button */}
      <div className="navbar-left-buttons">
        <NavLink to="/rules" className="faq-button">
          Regler
        </NavLink>
      </div>
      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Login Section */}
      <div className="navbar-buttons">
        <h3 style={{ color: "black" }}>*Username placeholder*</h3>
        {/*TODO: Add functionality to log user out of system. */}
        <NavLink to="/" className="login-button">
          Logga ut
        </NavLink>
      </div>
    </div>
  );
}