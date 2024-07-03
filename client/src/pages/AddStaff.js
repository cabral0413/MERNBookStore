import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import "./HomePage.css";

const AddStaff = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    birthday: "",
    Id: "",
    nic: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:1000/api/staffmem", {
        name: String(inputs.name),
        birthday: inputs.birthday, // Ensure the date format is correct
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnyFieldEmpty = Object.values(inputs).some(value => value === "");
    if (isAnyFieldEmpty) {
      window.alert("Please fill in all the fields");
      return;
    }

    if (!/^\d{3}$/.test(inputs.Id)) {
      window.alert("ID should consist of three integers.");
      return;
    }

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
        history("/staff");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed to add/update the member. Please try again.");
      });
  };

  return (
    <div className="AddBookPage">
      <div className="containeradd">
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
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>Name</FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              type="string"
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
            <FormLabel sx={{ color: "#000000", fontSize: "120%" }}>Birthday</FormLabel>
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
