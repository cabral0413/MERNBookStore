import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import "./HomePage.css";

const AddStaff = () => {
    const history = useNavigate();
    const [existingStaffIds, setExistingStaffIds] = useState([]);
  
    // State to store the form inputs
    const [inputs, setInputs] = useState({
      name: "",
      birthday: "",
      Id: "",
      nic: "",
    });

     // Event handler for input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to send the form data to the server
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:1000/api/staffmem", {
        name: String(inputs.name),
        birthday: Date(inputs.birthday),
        Id: Number(inputs.Id),
        nic: String(inputs.nic),
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert(error.response.data.message);
        throw new Error("Staff Id already exists");
      } else {
        throw new Error("Failed to add/update the member. Please try again.");
      }
    }
  };

   // Event handler for form submission
const handleSubmit = (e) => {
    e.preventDefault();

    
 // Check if any field is empty
const isAnyFieldEmpty = Object.values(inputs).some(value => value === "");

if (isAnyFieldEmpty) {
  window.alert("Please fill in all the fields ");
  return;
}

 // Validate ID format
  if (!/^\d{3}$/.test(inputs.Id)) {
  window.alert("ID should consist of three integers.");
  return;
 }

  // Validate NIC length
  if (
  inputs.nic.length !== 12 &&
  !(inputs.nic.length === 10 && /^[\d]{9}[vV]$/.test(inputs.nic))
  ) {
  window.alert("Please enter a valid NIC");
  return;
  }

  sendRequest()
  .then(() => {
    window.alert("Member added/updated successfully!");
    history("/staff"); // Navigate to the "/staff" route after successful submission
  })
  .catch((error) => {
    console.log(error); // Log the error message to the console
    window.alert("Failed to add/update the member. Please try again.");
  });
};
return (
    <div className="AddBookPage">
      <div className="containeradd ">
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
            {/* Form fields for staff information */}
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>
              Name
            </FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              type="string"
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>
              Birthday
            </FormLabel>
            <TextField
              value={inputs.birthday}
              onChange={handleChange}
              type="date"
              margin="normal"
              fullWidth
              variant="outlined"
              name="birthday"
            />
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>ID</FormLabel>
            <TextField
              value={inputs.Id}
              onChange={handleChange}
              type="text"
              margin="normal"
              fullWidth
              variant="outlined"
              name="Id"
            />
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>NIC</FormLabel>
            <TextField
              value={inputs.nic}
              onChange={handleChange}
              type="text"
              margin="normal"
              fullWidth
              variant="outlined"
              name="nic"
            />
           
            <Button className="scale-button" variant="contained" type="submit">
              Add Staff
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};
export default AddStaff;

