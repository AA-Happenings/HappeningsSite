import React, { useState, useEffect, useRef } from "react";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  const filters = ["Date", "Location", "Event Type", "Organizer"];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const addFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  // Close dropdown if clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-wrapper" ref={dropdownRef}>
      {/* Filter Button */}
      <div className="filter-button-container">
        <button className="filter-button" onClick={toggleDropdown}>
          <span className="filter-icon">🔍</span> Filter
        </button>

        {/* Dropdown for Filters */}
        {isOpen && (
          <div className="filter-dropdown">
            {filters.map((filter) => (
              <div
                key={filter}
                className="filter-dropdown-item"
                onClick={() => addFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Filters */}
      <div className="selected-filters">
        {selectedFilters.map((filter) => (
          <div key={filter} className="selected-filter">
            {filter}
            <span
              className="remove-filter"
              onClick={() => removeFilter(filter)}
            >
              ✖
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
