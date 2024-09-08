const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model
const userSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  password: { type: String, required: true },
  Role: { type: String, enum: ['admin', 'farmer'], required: true } // Example roles
});

const User = mongoose.model('User',userSchema);

module.exports = User;