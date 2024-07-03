// staff.js

import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const Staff = (props) => {
    const history = useNavigate();
    const { staff } = props;
    
    if (!staff) {
        return <div>Loading...</div>; // Or any fallback UI
    }

    const { _id, name, birthday, Id, nic } = staff;

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:1000/api/staffmem/${_id}`);
            window.alert("Member deleted successfully!");
            history("/api/");
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
