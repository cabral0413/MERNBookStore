// staffList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Staff from './Staff';
import "../style.css";

const StaffList = () => {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/staffmem');
                setStaffList(response.data.staffmem);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStaff();
    }, []);

    return (
        <div>
            {staffList.map((staff) => (
                <Staff key={staff._id} staff={staff} />
            ))}
        </div>
    );
};

export default StaffList;
