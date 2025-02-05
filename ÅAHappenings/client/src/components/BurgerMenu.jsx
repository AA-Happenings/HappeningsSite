import React, { useState, useRef, useEffect } from 'react';
import { stack as Menu } from 'react-burger-menu';
import "../styles/BurgerMenu.css";
import { GoHome } from "react-icons/go";
import { GoCalendar } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { GoSignOut } from "react-icons/go";

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
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
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)} // Sync state
      >
        <div className="bm-menu">
          <nav className="bm-item-list">
            <a 
                className="bm-item" 
                href="/">
                <GoHome style={{ verticalAlign: "middle" }} />
                <span>Hem</span>
            </a>

            <a 
                className="bm-item" 
                href="/myevents">
                <GoCalendar style={{ verticalAlign: "middle" }} />
                <span>Mina Evenemang</span>
            </a>
            <a 
                className="bm-item" 
                href="/info" >
                <GoPerson style={{ verticalAlign: "middle" }} />
                <span>Min Info</span>
            </a>
            <a 
                className="bm-item" 
                href="/rules">
                <GoChecklist style={{ verticalAlign: "middle" }} />
                <span>Regler</span>
            </a>
            <a 
                className="bm-item" 
                href="/">
                <GoSignOut style={{ verticalAlign: "middle" }} />
                <span>Logga ut</span>
            </a>
          </nav>
        </div>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
