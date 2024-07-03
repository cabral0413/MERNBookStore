// staff-controllers.js

const Staff = require('../model/Staff');
const { body, validationResult } = require('express-validator');


const addStaff = async (req, res, next) => {
    const { name, birthday, Id, nic } = req.body;
  
    // Check if a staff member with the same ID already exists
    const existingStaff = await Staff.findOne({ Id: Id });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff member with the same ID already exists" });
    }
  
    let staff;
    try {
      staff = new Staff({
        name,
        birthday,
        Id,
        nic,
      });
      await staff.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to add staff member" });
    }
  
    if (!staff) {
      return res.status(500).json({ message: "Unable to add staff member" });
    }
  
    return res.status(201).json({ staff });
};
  

//-------------------
// Get all staff members
const getStaffMembers = async (req, res, next) => {
    let staffmem;
    try {
      staffmem = await Staff.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!staffmem) {
      return res.status(404).json({ message: "No Staff member found" });
    }
    return res.status(200).json({ staffmem });
};



// Get a staff member by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let staff;
    try {
      staff = await Staff.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!staff) {
      return res.status(404).json({ message: "No Staff Member found" });
    }
    return res.status(200).json({ staff });
};

// Update a staff member
const updateStaff = async (req, res, next) => {
    const id = req.params.id;
    const { name, birthday,Id,nic } = req.body;
    let staff;
    try {
      staff = await Staff.findByIdAndUpdate(id, {
        name,
        birthday,
         Id,
          nic,
      });
      staff = await staff.save();
    } catch (err) {
      console.log(err);
    }
    if (!staff) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ staff });
};


// Delete a staff member
const deleteStaff = async (req, res, next) => {
    const id = req.params.id;
    let staff;
    try {
      staff = await Staff.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!staff) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Member Successfully Deleted" });
};


exports.getStaffMembers = getStaffMembers;
exports.addStaff = addStaff ;
exports.getById = getById ;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff ;
  
  
  