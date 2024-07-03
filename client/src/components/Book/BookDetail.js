//Update a book 


import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style.css";
  
  
const BookDetail = () => {
    const [inputs, setInputs] = useState();
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(() => {
      const fetchHandler = async () => {
        // Fetch the book details using the ID from the API
        await axios
          .get(`http://localhost:1000/api/books/${id}`)
          .then((res) => res.data)
          .then((data) => setInputs(data.book));
      };
      fetchHandler();
    }, [id]);
  
     // Send a PUT request to update the book with the specified ID
    const sendRequest = async () => {
      await axios
        .put(`http://localhost:1000/api/books/${id}`, {
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
    const handleSubmit = (e) => {
      e.preventDefault();
      sendRequest().then(() => history("/books"));
    };
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    return (
      
      <div className = "UpdatePage"  >
      <h2>Update book information </h2>
      <div className = "containerUpdate"  >
    
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              maxWidth={700}
              alignContent={"center"}
              alignSelf="center"
              marginLeft={"auto"}
              marginRight="auto"
              marginTop={10}
            >
              <FormLabel>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="name"
                sx={{ "& .MuiInputBase-root": { borderColor: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <FormLabel>Author</FormLabel>
              <TextField
                value={inputs.author}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="author"
                sx={{ "& .MuiInputBase-root": { borderColor: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <FormLabel>Description</FormLabel>
              <TextField
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="description"
              />
              <FormLabel>Price</FormLabel>
              <TextField
                value={inputs.price}
                onChange={handleChange}
                type="number"
                margin="normal"
                fullWidth
                variant="outlined"
                name="price"
              />
              <FormLabel>Image</FormLabel>
              <TextField
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="image"
                sx={{ "& .MuiInputBase-root": { borderColor: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <FormLabel>Available Quantity</FormLabel>
              <TextField
                value={inputs.quantity}
                onChange={handleChange}
                type="number"
                margin="normal"
                fullWidth
                variant="outlined"
                name="quantity"
                sx={{ "& .MuiInputBase-root": { borderColor: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="Available"
              />
  
              <Button className="scale-button3" variant="contained" type="submit">
                Update Book
              </Button>
            </Box>
          </form>
        )}
        </div>
      </div>
    );
};
  
export default BookDetail;