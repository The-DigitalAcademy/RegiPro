const authJWT = require("../middleware/authJWT");
const controller = require('../controllers/planController');

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  app.post("/business" , [authJWT.verifyToken], controller.createNewBusiness);
  app.get("/business/:id" , [authJWT.verifyToken], controller.getBusinessById);


 
};





