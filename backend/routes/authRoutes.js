const verifySignUp  = require("../middleware/verifySignup");
const controller = require("../controllers/authController");
const swaggerDocs = require("../config/swagger");

module.exports = function(app) {
  app.use(function(req, res, next) {
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

  /**
 * @openapi
 '/auth/signin':
 *  post:
 *     tags:
 *     - Auth Route
 *     summary: Signs in a user
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
  app.post("/auth/signin", controller.signin);
  app.post("/auth/signout", controller.signout);
  //
app.post('/auth/forgotPassword', controller.forgotPassword);
app.put('/auth/resetPassword', controller.resetPassword);
};
