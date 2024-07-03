import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';


const AddBook = () => {
    const history = useNavigate();
  
    // State to store the form inputs
    const [inputs, setInputs] = useState({
      name: "",
      description: "",
      price: "",
      author: "",
      image: "",
      quantity: "",
    });
  
    // State for the checkbox
    const [checked, setChecked] = useState(false);

    // Event handler for input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

   // Function to send the form data to the server
   const sendRequest = async () => {
    await axios
      .post("http://localhost:1000/api/books", {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        quantity: Number(inputs.quantity),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };

  
  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(inputs).some((value) => value === "");

    if (isAnyFieldEmpty) {
      window.alert("Please fill in all the fields.");
      return;
    }

    sendRequest()
    .then(() => {
      window.alert("Book added/updated successfully!");
      history("/books"); // Navigate to the "/books" route after successful submission
    })
    .catch(() => {
      window.alert("Failed to add/update the book. Please try again.");
    });
};

return (
    <div className = "AddBookPage"  >
     <div className = "containeradd"  >
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        color={"black"}
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        {/* Form fields for book information */}
        <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
       

       <FormLabel sx={{ color: "#000000" ,fontSize:"120%"}}>Author</FormLabel>
        <TextField
          value={inputs.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        />
        <FormLabel sx={{ color: "#000000",fontSize:"120%" }}>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel sx={{ color: "#000000" ,fontSize:"120%" }}>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
         <FormLabel sx={{ color: "#000000" ,fontSize:"120%"}}>Available Quantity</FormLabel>
        <TextField
          value={inputs.quantity}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="quantity"
        />
        <FormLabel sx={{ color: "#000000" ,fontSize:"120%"}}>Image</FormLabel>
        <TextField
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
          placeholder="Enter the URL link"
        />
       
        {/* Checkbox for availability */}
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Available"
        />

        {/* Submit button */}
        <Button className="scale-button2" variant="contained" type="submit">
          Add Book
        </Button>
      </Box>
    </form>
    </div>
    </div>

  );
};

export default AddBook;


  