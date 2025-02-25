import { NavLink } from "react-router-dom";
import BurgerMenu from '../components/BurgerMenu';
import { useAuthContext } from "../hooks/useAuthContext";

export default function TopBar() {
  const { user } = useAuthContext();
  const loggedIn = true;
  
  return (
    <div className="navbar">
      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Right content Section */}
      <div className="navbar-buttons">

        {/*
        // if a user is logged in, display email on topbar
        {user && (
          <span>
          {user.email}
        </span>
        )}
        */}
        {user ? <BurgerMenu /> : <NavLink to="/login" className="login-button"> Logga in</NavLink> }

      </div>
    </div>
  );
}

