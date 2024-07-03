// Staff.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the staff schema
const staffSchema = new Schema({
  name: { type: String, required: true },
  birthday: { type: Date },
  Id: { type: Number, required: true },
  nic: { type: String, required: true },
  
});

// Export the Staff model
module.exports = mongoose.model("Staff",staffSchema);