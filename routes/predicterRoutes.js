const predictController = require("../controllers/predicter");
module.exports = (app)=>{
    app.get('/agroTech/api/v1/fertilizer-predict',predictController.fertilizerPrediction);

    app.get('/agroTech/api/v1/crop-predict',predictController.cropPrediction);

} 