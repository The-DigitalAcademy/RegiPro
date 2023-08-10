
const controller = require('../controllers/resController')

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  app.post("/responses", controller.createNewResponse);
  // app.get("/questions", controller.getQuestions);  
  
   
  };

