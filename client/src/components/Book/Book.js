import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image, quantity } = props.book;

  const deleteHandler = async () => {
    try {
      // Send a DELETE request to delete the book with the specified ID
      await axios.delete(`http://localhost:1000/api/books/${_id}`);
      window.alert("Book deleted successfully!");

      // Redirect to the books page after successful deletion
      history("/api/");
      history("/books");
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete the book. Please try again.");
    }
  };

  return (
    
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author.slice(0, 30)}...</article>
      <h3>{name}</h3>
      <h3>Rs {price}</h3>
      <h4>Available quantity: {quantity}</h4>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
  );
};

export default Book;
