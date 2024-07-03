import React, { useEffect, useState } from "react";
import axios from "axios"; // Importing the axios library for making HTTP requests
import Staff from "./Staff"; // Importing the Staff component
import "../style.css";

const URL = "http://localhost:1000/api/staffmem"; // URL for fetching staff data


const StaffList = () => {
    const [staffmem, setStaff] = useState([]); // State to store the staff data
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
    const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isButtonReleased, setIsButtonReleased] = useState(false);
  
    
    useEffect(() => {
      fetchStaff();
    }, []);
  
    // Fetching staff data from the server
    const fetchStaff = async () => {
      try {
        const response = await axios.get(URL); // Sending a GET request to the server API to fetch staff data
        setStaff(response.data.staffmem); // Setting the fetched staff data in the state
      } catch (error) {
        console.error("Error fetching Staff:", error);
      }
    };

     // Handling the search functionality
  const handleSearch = () => {
    const filteredStaff = searchQuery
      ? staffmem.filter((staff) =>
          staff.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) // Filtering staff based on the search query (case-insensitive)
      : staffmem;
    setSearchResults(filteredStaff); // Setting the filtered search results in the state
    setIsButtonClicked(true);

    
    // Reset the button color after a short delay
    setTimeout(() => {
        setIsButtonClicked(false);
        setIsButtonReleased(true);
      }, 300);
    
    };

    
  return (
    <div className = "showDetails"  >
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by member name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
            onClick={handleSearch}
            className={`search-button ${isButtonClicked ? "clicked" : ""} ${isButtonReleased ? "released" : ""}`}
          >
            Search
          </button>
      </div>

      <div>
        <ul>
          {searchResults.length > 0 ? (
            searchResults.map((staff, i) => (
              <li key={i}>
                <Staff staff={staff} /> {/* Rendering the Staff component for each filtered search result */}
              </li>
            ))
          ) : (
            staffmem.map((staff, i) => (
              <li key={i}>
                <Staff staff={staff} /> {/* Rendering the Staff component for each staff member */}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
export default StaffList;
  





