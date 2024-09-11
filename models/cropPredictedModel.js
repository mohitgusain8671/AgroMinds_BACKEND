const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crop Prediction Model
const cropPredictionSchema = new Schema({
    _id: { type: Number, required: true },
    userID: { type: Number, ref: 'User', required: true },
    inputfields: {
      soil: {
        Type: { type: String, required: true },
        PH: { type: Number, required: true },
        N2: { type: Number, required: true },
        P: { type: Number, required: true },
        K: { type: Number, required: true }
      },
      weather: {
        rainfall: { type: Number, required: true },
        humidity: { type: Number, required: true },
        temp: { type: Number, required: true }
      }
    },
    predictedcropID: { type: Number, ref: 'Crop', required: true }
});

const CropPrediction = mongoose.model('CropPrediction',cropPredictionSchema);

module.exports = CropPrediction;