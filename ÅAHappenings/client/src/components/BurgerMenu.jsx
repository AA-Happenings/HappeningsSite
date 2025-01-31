import React, { useState, useRef, useEffect } from 'react';
import { stack as Menu } from 'react-burger-menu';
import "../BurgerMenu.css";
import { CgHome } from "react-icons/cg";
import { CgCalendarDates } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
import { CgClipboard } from "react-icons/cg";

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
                <CgHome style={{ verticalAlign: "middle" }} />
                <span>Hem</span>
            </a>

            <a 
                className="bm-item" 
                href="/myevents">
                <CgCalendarDates style={{ verticalAlign: "middle" }} />
                <span>Mina Evenemang</span>
            </a>
            <a 
                className="bm-item" 
                href="/info" >
                <CgUser style={{ verticalAlign: "middle" }} />
                <span>Min Info</span>
            </a>
            <a 
                className="bm-item" 
                href="/rules">
                <CgClipboard style={{ verticalAlign: "middle" }} />
                <span>Regler</span>
            </a>
          </nav>
        </div>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
