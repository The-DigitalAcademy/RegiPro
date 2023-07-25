const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/users/all", controller.allAccess);

  app.get("/users/user", [authJWT.verifyToken], controller.userBoard);

  app.get(
    "/users/mod",
    [authJWT.verifyToken, authJWT.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/users/admin",
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminBoard
  );
};
