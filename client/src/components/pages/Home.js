import React from 'react';
import './HomePage.css'; // You can create a CSS file for styling
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="homepage">
        <div className="top-image"></div>
        <div className="content">
        <div className="intro-container">
          <div className="intro-text">
            <h2>Welcome to Sarasi Book Store</h2>
            <p>
              Founded in 2015, Sarasi Book Store has been
              serving as a trusted hub for all internal processes and activities
              of our esteemed bookshop. Our organization is dedicated to
              ensuring the smooth and efficient management of various tasks,
              allowing us to provide exceptional service to our customers and
              enhance their overall experience.
            </p>
            <p>
              Our mission is to streamline operations, optimize resource
              allocation, and foster a collaborative environment among our staff
              members. By leveraging technology and implementing effective
              systems, we strive to improve productivity, inventory management,
              customer relationship management, and other critical aspects of
              our business.
            </p>
            <p>
              At Sarasi Book Store, we believe in continuous growth and development.
              We value our employees and are committed to providing them with
              opportunities for learning and advancement. We encourage
              creativity, innovation, and teamwork, as we understand that our
              success relies on the dedication and expertise of our staff.
            </p>
            <p>
              As we move forward, we remain focused on adapting to the changing
              landscape of the book industry and embracing new technologies and
              trends. Our goal is to strengthen our position as a leader in the
              market, constantly striving for excellence in all aspects of our
              operations.
            </p>
          </div>
        </div>

      <div className="right-section">
        <div className="button-container">
          <Link to="/books" className="shaking-button">
            View All Books
          </Link>
        </div>
      </div>
      </div>
      <footer className="footer">
        <p>Sarasi BookStore &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
};


export default Home;



  