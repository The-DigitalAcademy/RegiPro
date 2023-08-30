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

  /**
 * @openapi
 '/responses':
 *  post:
 *     tags:
 *     - Response Route
 *     summary: Responses
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                 type: string
 *                 default: string
 *              industry:
 *                 type: string
 *                 default: string
 *              description:
 *                 type: string
 *                 default: string
 *              isRegistered:
 *                 type: string
 *                 default: string
 *              hasBusinessPlan:
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

  app.post("/responses" , [authJWT.verifyToken], controller.createNewResponse);
  app.get("/responses" , [authJWT.verifyToken], controller.getAllResponses);



    /**
 * @openapi
 '/responses/:id':
 *  post:
 *     tags:
 *     - Response Route
 *     summary: Responses
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              id:
 *                 type: string
 *                 default: string
 *              name:
 *                 type: string
 *                 default: string
 *              industry:
 *                 type: string
 *                 default: string
 *              description:
 *                 type: string
 *                 default: string
 *              isRegistered:
 *                 type: string
 *                 default: string
 *              hasBusinessPlan:
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

  app.get("/responses/:id", [authJWT.verifyToken], controller.getResponseById);


};





