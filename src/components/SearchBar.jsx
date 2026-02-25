import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
