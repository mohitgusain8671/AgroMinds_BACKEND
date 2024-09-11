const fertilizerController = require("../controllers/fertilizersController")

module.exports = (app) =>{
    app.get('/agroTech/api/v1/getFertilizers',fertilizerController.getAllFertilizers);

    app.post('/agroTech/api/v1/AddFertilizers',fertilizerController.saveFertilizers)
}