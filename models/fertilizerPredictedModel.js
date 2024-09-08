const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Fertilizer Recommendation Model
const fertilizerRecommendationSchema = new Schema({
    _id: { type: Number, required: true },
    userID: { type: Number, ref: 'User', required: true },
    inputfields: {
      soil: {
        Type: { type: String, required: true },
        ph: { type: Number, required: true },
        N2: { type: Number, required: true },
        K: { type: Number, required: true },
        P: { type: Number, required: true }
      },
      weather: {
        temp: { type: Number, required: true },
        moisture: { type: Number, required: true },
        rainfall: { type: Number, required: true }
      }
    },
    fertilizerID: { type: Number, ref: 'Fertilizers', required: true },
    Quantity: { type: Number, required: true }
});

const FertilizerPrediction = mongoose.model('FertilizerPrediction',userSchema);

module.exports = FertilizerPrediction;