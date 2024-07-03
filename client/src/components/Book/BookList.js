import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import "../style.css";

const URL = "http://localhost:1000/api/books";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonReleased, setIsButtonReleased] = useState(false);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Fetch the list of books from the API
      const response = await axios.get(URL);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = () => {
    // Filter the books based on the search query
    const filteredBooks = searchQuery
      ? books.filter((book) =>
          book.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : books;
    setSearchResults(filteredBooks);
    setIsButtonClicked(true);

     // Reset the button color after a short delay
     setTimeout(() => {
      setIsButtonClicked(false);
      setIsButtonReleased(true);
    }, 100);
  };

  return (
   
    <div className="showDetails">
    <div className="bgimg">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by book name..."
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
            // Render search results if available
            searchResults.map((book, i) => (
              <li key={i}>
                <Book book={book} />
              </li>
            ))
          ) : (
            // Render all books if no search results
            books.map((book, i) => (
              <li key={i}>
                <Book book={book} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default BookList;
