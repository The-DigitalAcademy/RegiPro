
const controller = require('../controllers/businessnameController')

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  app.post("/questions", controller.createQuestion);
  app.get("/questions", controller.getQuestions);  
  
   
  };


