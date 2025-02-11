import { NavLink } from "react-router-dom";
import BurgerMenu from '../components/BurgerMenu';

export default function TopBar() {
  const loggedIn = true;
  return (
    <div className="navbar">
      {/* Title */}
      <NavLink to="/" className="navbar-title">
        <span>ÅA-Happenings</span>
      </NavLink>

      {/* Right content Section */}
      <div className="navbar-buttons">
        {loggedIn ? <BurgerMenu /> : <NavLink to="/login" className="login-button"> Logga in</NavLink> }
      </div>
    </div>
  );
}
