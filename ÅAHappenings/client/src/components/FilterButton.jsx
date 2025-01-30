import React, { useEffect, useRef, useState } from "react";

const FilterButton = ({ name, availableFilters, selectedFilters, onFilterUpdate }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleAddFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      onFilterUpdate([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: "inline-block",
        margin: "0 10px",
        position: "relative",
      }}
      ref={dropdownRef}
    >
      {/* Filter Button */}
      <button
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        🔍 {name}
      </button>

      {/* Dropdown */}
      {dropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            zIndex: 1000,
            padding: "10px",
            width: "200px",
          }}
        >
          {availableFilters.map((filter) => (
            <div
              key={filter}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => handleAddFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
