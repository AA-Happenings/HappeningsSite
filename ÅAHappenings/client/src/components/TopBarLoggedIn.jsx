import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="navbar">
      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

    </div>
  );
}