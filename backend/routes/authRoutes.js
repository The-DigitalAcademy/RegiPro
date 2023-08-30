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
  /**
 * @openapi
 '/auth/signup':
 *  post:
 *     tags:
 *     - Auth Route
 *     summary: Sign up the user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstname:
 *                 type: string
 *                 default: string
 *              lastname:
 *                 type: string
 *                 default: string
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
 *     summary: Auth in user
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
  app.post("/auth/signin", loginLimiter, controller.signin);


  app.post("/auth/signout", controller.signout);

  

   /**
 * @openapi
 '/auth/forgotPassword':
 *  post:
 *     tags:
 *     - Auth Route
 *     summary: forgot password
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
app.post('/auth/forgotPassword', controller.forgotPassword);
   /**
 * @openapi
 '/auth/resetPassword':
 *  put:
 *     tags:
 *     - Auth Route
 *     summary: Reset password
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
app.put('/auth/resetPassword', controller.resetPassword);



};
