// staff-routes.js

const express = require("express");
const router = express.Router();
const staffControllers = require('../controllers/staff-controllers');
const Staff = require("../model/Staff");
// Define the API routes for staff management



// GET all staff members
router.get("/", staffControllers.getStaffMembers);

// GET a staff member by ID
router.get("/:id", staffControllers.getById);

// POST a new staff member
router.post("/", staffControllers.addStaff);

// PUT (update) a staff member by ID
router.put("/:id", staffControllers.updateStaff);

// DELETE a staff member by ID
router.delete("/:id", staffControllers.deleteStaff);



module.exports = router;
