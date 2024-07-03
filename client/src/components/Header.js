import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavLink, Link, useLocation, useNavigate} from "react-router-dom";
import logo from "../Images/icon6.png"; // Import your logo image file
import axios from "axios";

const Header = () => {
    const [value, setValue] = useState(); // State to store the active tab value
    const navigate = useNavigate(); // Accessing the navigation function from React Router
    const location = useLocation();

    const handleLogout = async () => {
        try {
          // Send a request to the server to logout the staff member
          await axios.post("http://localhost:1000/api/logout");
    
          // Clear any stored user data or tokens in the frontend
          // ...
    
          // Redirect the user to the login page
          alert("Logout successful"); // Display a success message
          navigate("/");
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

      
  return (
    <div>
      <AppBar
        sx={{
          backgroundColor: "black",
          width: "100%",
          height: 100, // Increase the height of the navigation bar
          justifyContent: "center",
        }}
        position="sticky"
      >
        <Toolbar>
          <Avatar
            src={logo}
            alt="Logo"
            sx={{ width: 80, height: 80, marginRight: 1 }} // Increase the size of the logo
          />
          <div>
            <Typography
              variant="h2"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Your Beautiful Font",
                lineHeight: "1.2",
              }}
            >
              Sarasi
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Monospac",
                lineHeight: "1.2",
              }}
            >
              Book Shop
            </Typography>
          </div>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab
              LinkComponent={NavLink}
              to="/home"
              label="Home"
              sx={{ fontSize: "18px" }}
            />
            <Tab
              LinkComponent={NavLink}
              to="/books/add"
              label="Add Product"
              sx={{ fontSize: "18px" }}
            />
            <Tab
              LinkComponent={NavLink}
              to="/books"
              label="Books"
              sx={{ fontSize: "18px" }}
            />
            <Tab
              LinkComponent={NavLink}
              to="/staff"
              label="Staff"
              sx={{ fontSize: "18px" }}
            />
            <Tab
              LinkComponent={NavLink}
              to="/staff/add"
              label="Add Staff"
              sx={{ fontSize: "18px" }}
            />
            <Tab label="Logout" onClick={handleLogout} sx={{ fontSize: "18px" }} />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

      