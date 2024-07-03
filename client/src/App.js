import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookList from "./components/Book/BookList";
import BookDetail from "./components/Book/BookDetail";
import Login from "./pages/Login";
import StaffList from "./components/staff/StaffList";
import AddStaff from "./pages/AddStaff";
import StaffDetail from "./components/staff/StaffDetail";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";

  // State to manage the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Check if the user is already logged in
    // Set the isLoggedIn state accordingly
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array to ensure the effect runs only once

  const isUserLoggedIn = () => {
    // Check the token or flag in local storage
    const token = localStorage.getItem("token");
    // Return true if the token or flag exists, otherwise return false
    return !!token;
  };


  return (
    <React.Fragment>
      {/* Render the header if hideHeader is false */}
      {!hideHeader && <Header>{isLoggedIn && <Header />}</Header>}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Login />
            } // If user is logged in, navigate to the home page, otherwise render the login page
            exact
          />
          <Route path="/home" element={<Home />} exact />
          <Route path="/books/add" element={<AddBook />} exact />
          <Route path="/books" element={<BookList />} exact />
          <Route path="/books/:id" element={<BookDetail />} exact/> 
          <Route path="/staff" element={<StaffList />} exact />
          <Route path="/staffmem/:id" element={<StaffDetail />} exact />
          <Route path="/" element={<Login/>} exact /> 
          <Route  path="/staff/add"  element={<AddStaff />}  exact /> 
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;