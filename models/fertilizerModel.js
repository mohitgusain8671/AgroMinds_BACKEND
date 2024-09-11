const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Fertilizers Model
const fertilizersSchema = new Schema({
    fertilizerID: { type: Number, required: true },
    name: { type: String, required: true },
    description: [String],
    organic_methods: [String],
    N2_content: { type: Number, required: true },
    Phosphorus_Content: { type: Number, required: true },
    Potassium_content: { type: Number, required: true }
});

const Fertilizers = mongoose.model('Fertilizers',fertilizersSchema);

module.exports = Fertilizers;