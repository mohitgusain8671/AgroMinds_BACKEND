const predictController = require("../controllers/predicter");
module.exports = (app)=>{
    app.post('/agroTech/api/v1/fertilizer-predict',predictController.fertilizerPrediction);

    app.post('/agroTech/api/v1/crop-predict',predictController.cropPrediction);

    app.post('/agroTech/api/v1/calculateFertilizer',predictController.calculateFertilizer);

} 