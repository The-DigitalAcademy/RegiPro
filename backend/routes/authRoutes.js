const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/authController");

const loginLimiter = require('../middleware/loginLimiter')


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/auth/signin", loginLimiter, controller.signin);


  app.post("/auth/signout", controller.signout);

  app.post('/auth/forgotPassword', controller.forgotPassword);
  app.put('/auth/resetPassword', controller.resetPassword);
};
