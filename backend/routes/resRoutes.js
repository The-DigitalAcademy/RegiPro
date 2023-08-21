const authJWT = require("../middleware/authJWT");
const controller = require('../controllers/resController');

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  app.post("/responses" , [authJWT.verifyToken], controller.createNewResponse);
  app.get("/responses" , [authJWT.verifyToken], controller.getAllResponses);

  app.get("/responses/:id", [authJWT.verifyToken], controller.getResponseById);

 
};





