
const swaggerJsdoc  = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Regipro API",
      description: " ",
      version: "0.0.1",
    },
  
  },
  // looks for configuration in specified directories
  apis: [
    "./routes/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  // app.use("/regipro", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/regipro", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;