const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book-routes");
const staffRoutes = require("./routes/staff-routes");
const cors = require("cors");
const path = require('path');

const app = express();

// Middlewares
app.use(express.json()); // Middleware for parsing JSON data
app.use(cors()); // Middleware for enabling CORS

// Mounting routes
app.use('/api/books', bookRoutes); // Mounting book routes at '/api/books'
app.use('/api/staffmem', staffRoutes); // Mounting staff routes at '/api/staff'

// Serve static files from the React app
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));

// Catch-all handler to serve the React app for any other routes
app.get("/*", function(req, res) {
  res.sendFile(
    path.join(buildPath, "index.html"),
    function(err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Define your routes
app.post("/api/logout", (req, res) => {
    // Perform any logout logic here
    // For example, clearing session data or JWT token
    
    res.status(200).json({ message: "Logout successful" });
});

// Connecting to MongoDB database
mongoose
  .connect(
    "mongodb+srv://nipunicabral27:YZvSQkmBCCckLsTp@cluster0.obbyxgw.mongodb.net/"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    // Starting the server
    app.listen(1000, () => console.log("Server is running on port 1000"));
 })
 .catch((err) => console.log(err));

