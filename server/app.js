const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book-routes");
const staffRoutes = require("./routes/staff-routes");
const cors = require("cors");
const app = express();
const path = require('path')

//-------------
const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../client/App.js");

app.use(express.static(buildPath))

app.get("/*",function(req,res){

  res.sendFile(
    path.join(_dirname,"../client/App.js"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  );
})


// Middlewares
app.use(express.json()); // Middleware for parsing JSON data
app.use(cors()); // Middleware for enabling CORS
app.use('/api/books', bookRoutes); // Mounting book routes at '/api/books'
app.use('/api/staffmem', staffRoutes); // Mounting staff routes at '/api/staff'

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
    app.listen(1000);
 })
 .catch((err) => console.log(err));

