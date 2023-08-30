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
    /**
 * @openapi
 '/users/user':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Sign in user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                 type: string
 *                 default: string
 *              password:
 *                 type: string
 *                 default: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Internal Server Error
 */

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
