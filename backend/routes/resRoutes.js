const authJWT = require("../middleware/authJWT");
const controller = require('../controllers/resController');
// const Response = require("../models/Response");
const db = require("../models");
const Response = db.response;
const express = require('express');
const app = express();

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  app.post("/responses" , [authJWT.verifyToken], controller.createNewResponse);

  app.get('/responses/:userId', async (req, res)  => {
    try {
      const userId = req.params.userId; // Extract userId from the URL parameter
      
      const userResponse =  await Response.findByPk(userId);
      
      if (!userResponse) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(userResponse);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
};





