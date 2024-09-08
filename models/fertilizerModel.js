const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Fertilizers Model
const fertilizersSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    N2_content: { type: Number, required: true },
    Phosphorus_Content: { type: Number, required: true },
    Potassium_content: { type: Number, required: true }
});

const Fertilizers = mongoose.model('Fertilizers',userSchema);

module.exports = Fertilizers;