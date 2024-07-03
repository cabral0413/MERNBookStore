import { Button } from "@mui/material"; // Importing the Button component from the MUI library
import axios from "axios"; // Importing the axios library for making HTTP requests
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom for navigation
import "../style.css"; // Importing the CSS file for styling



const Staff = (props) => {
    const history = useNavigate(); // Initializing the history object for navigation
    const { _id, name, birthday, Id, nic } = props.staff; // Destructuring the staff object received as props
     

    
  // Handler for deleting a staff member
  const deleteHandler = async () => {
    try {
      // Send a DELETE request to delete the book with the specified ID
      await axios.delete(`http://localhost:1000/api/staffmem/${_id}`);
      window.alert("Member deleted successfully!");
      history("/api/");
      // Redirect to the staff page after successful deletion
      history("/staff");
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete the member details. Please try again.");
    }
  };

  
  return (
    <div className="card">
    <div className="align">

    <h3>
      <span>Staff ID</span>{Id}
    </h3>
    <h3>
      <span>Name</span>{name}
    </h3>
    <h4>
      <span>Birth Day</span>{new Date(birthday).toLocaleDateString()}
    </h4>
    <h4>
      <span>Nic No</span>{nic}
    </h4>
    </div>
    <Button LinkComponent={Link} to={`/staffmem/${_id}`} sx={{ mt: "auto" }}>
      Update
    </Button>
    <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
      Delete
    </Button>
  </div>
  );
};

export default Staff;
  