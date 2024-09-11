

const authController = require("../controllers/authController.js")
module.exports = (app)=>{
    app.post('/agroTech/api/v1/auth/signup',authController.signup);
    app.post('/agroTech/api/v1/auth/signin',authController.signIn); 

}