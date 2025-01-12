import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="navbar">
      {/* FAQ Button */}
      <div className="navbar-left-buttons">
        <NavLink to="/faq" className="faq-button">
          FAQ
        </NavLink>
      </div>

      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Login Section */}
      <div className="navbar-buttons">
        <h3 style={{ color: "black" }}>Arrangörsinloggning</h3>
        <NavLink to="/login" className="login-button">
          Logga in
        </NavLink>
      </div>
    </div>
  );
}
