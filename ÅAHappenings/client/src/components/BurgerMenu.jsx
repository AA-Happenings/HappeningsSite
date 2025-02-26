import React, { useState, useRef, useEffect } from 'react';
import { stack as Menu } from 'react-burger-menu';
import "../styles/BurgerMenu.css";
import { GoHome, GoCalendar, GoPerson, GoChecklist, GoSignOut } from "react-icons/go";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink } from "react-router-dom";

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div ref={menuRef}>
      <Menu 
        right 
        noOverlay
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      >
        {user && (
          <div className="user-email">
            {user.email}
          </div>
        )}

        <div className="bm-menu">
          <nav className="bm-item-list">
            <NavLink 
              className="bm-item" 
              to="/" 
              onClick={() => setMenuOpen(false)}
            >
              <GoHome style={{ verticalAlign: "middle" }} />
              <span>Hem</span>
            </NavLink>

            <NavLink 
              className="bm-item" 
              to="/myevents" 
              onClick={() => setMenuOpen(false)}
            >
              <GoCalendar style={{ verticalAlign: "middle" }} />
              <span>Mina Evenemang</span>
            </NavLink>

            <NavLink 
              className="bm-item" 
              to="/info" 
              onClick={() => setMenuOpen(false)}
            >
              <GoPerson style={{ verticalAlign: "middle" }} />
              <span>Min Info</span>
            </NavLink>

            <NavLink 
              className="bm-item" 
              to="/rules" 
              onClick={() => setMenuOpen(false)}
            >
              <GoChecklist style={{ verticalAlign: "middle" }} />
              <span>Regler</span>
            </NavLink>
            
            <button 
              onClick={handleLogout}
              className="bm-item"
            >
              <GoSignOut style={{ verticalAlign: "middle" }} />
              <span>Logga ut</span>
            </button>
          </nav>
        </div>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
