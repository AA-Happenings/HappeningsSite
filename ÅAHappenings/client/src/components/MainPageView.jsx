import React, { useState } from "react";
import CalendarView from "./CalendarView";
import FilterButton from "./FilterButton";

export default function MainPageView() {
  const [allFilters, setAllFilters] = useState({
    evenemangstyp: [],
    taggar: [],
    förening: [],
  });

  const handleFilterUpdate = (position, updatedFilters) => {
    setAllFilters((prev) => ({
      ...prev,
      [position]: updatedFilters,
    }));
  };

  const availableFilters = {
    evenemangstyp: ["Sport", "Kultur", "Sittning", "Gratis"],
    taggar: ["Gulisevenemang", "BYOB", "Endast Medlemmar"],
    förening: ["Kemistklubben", "SF-Klubben", "Merkantila Klubben", "Humanistiska Föreningen"],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Filter Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2vw"}}>
        <FilterButton
          position="Evenemangstyp"
          availableFilters={availableFilters.evenemangstyp}
          selectedFilters={allFilters.evenemangstyp}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          position="Taggar"
          availableFilters={availableFilters.taggar}
          selectedFilters={allFilters.taggar}
          onFilterUpdate={handleFilterUpdate}
        />
        <FilterButton
          position="Förening"
          availableFilters={availableFilters.förening}
          selectedFilters={allFilters.förening}
          onFilterUpdate={handleFilterUpdate}
        />
      </div>

      {/* Selected Filters */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {Object.entries(allFilters).map(([position, filters]) =>
          filters.map((filter) => (
            <div
              key={filter}
              style={{
                display: "inline-block",
                margin: "4px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "#f5f5f5",
                border: "1px solid #ddd",
              }}
            >
              {filter}
              <span
                style={{
                  marginLeft: "8px",
                  color: "#888",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  handleFilterUpdate(
                    position,
                    filters.filter((f) => f !== filter)
                  )
                }
              >
                ✖
              </span>
            </div>
          ))
        )}
      </div>

      {/* Calendar */}
      <div style= {{marginTop: '-1vw'}}>
        <CalendarView />
      </div>
    </div>
  );
}
