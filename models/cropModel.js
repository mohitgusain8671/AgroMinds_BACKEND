const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crop Model
const cropSchema = new Schema({
    cropID: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String },
    optimal_ph_min: { type: Number, required: true },
    optimal_ph_max: { type: Number, required: true },
    optimal_temp_min: { type: Number, required: true },
    optimal_temp_max: { type: Number, required: true },
    optimal_moisture_min: { type: Number, required: true },
    optimal_moisture_max: { type: Number, required: true },
    N: { type: Number, required: true},
    P: { type: Number, required: true},
    K: { type: Number, required: true},
},{timestamps:true,versionKey:false});
  
const Crop = mongoose.model('Crop',cropSchema);

module.exports = Crop;