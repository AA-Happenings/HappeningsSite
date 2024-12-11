import { NavLink } from "react-router-dom";
/*Top bar element without the Logga in button, meant to be used for subpages */
export default function TopBar() {
  return (
    <div className="navbar">
      {/* Title that links to the homepage */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

    
    </div>
  );
}

  