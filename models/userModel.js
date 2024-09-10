const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model
const userSchema = new Schema({
  Name: { type: String, required: true},
  Email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  Role: { type: String, enum: ['admin', 'farmer'], required: true },
  IsVerified: {type: Boolean},
  Code: {type: Number}
},{timestamps:true,versionKey:false});

const User = mongoose.model('User',userSchema);

module.exports = User;