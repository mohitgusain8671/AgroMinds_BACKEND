const cropController = require("../controllers/cropController")

module.exports = (app) =>{
    app.get('/agroTech/api/v1/getCrops',cropController.getAllCrops);

    app.post('/agroTech/api/v1/AddCrops',cropController.saveCrops);

    app.put('/agroTech/api/v1/updateCrop/:cropId',cropController.updateCrop);
}