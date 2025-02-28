import { NavLink, useLocation } from "react-router-dom";
import BurgerMenu from '../components/BurgerMenu';
import { useAuthContext } from "../hooks/useAuthContext";

export default function TopBar() {
  const { user } = useAuthContext();
  const location = useLocation();
  
  // Determine if the current page is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="navbar">
      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Right content Section */}
      <div className="navbar-buttons">
        {user ? (
          <BurgerMenu />
        ) : (
          // Only render the login button if we're not on the login page
          !isLoginPage && <NavLink to="/login" className="login-button">Logga in</NavLink>
        )}
      </div>
    </div>
  );
}
