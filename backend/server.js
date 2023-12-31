require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const swaggerDocs = require("./config/swagger");

const PORT = process.env.PORT || 5001;

console.log(process.env.NODE_ENV);

// Enable CORS for a specific origin (in this case, regipro.vercel.app)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://regipro.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.listen(PORT, () => {

  console.log(`Server is running on port: ${PORT}`);
  swaggerDocs(app, PORT);

});
swaggerDocs(app);

app.use(logger);

app.use(cors(corsOptions));


app.use(express.json());

// database
const db = require("./models");

const Role = db.role;

// db.sequelize.sync();
// Synchronize Database Schema (No Drop, No Alter)
db.sequelize.sync({ force: false, alter: true, logging: true }).then(() => {
  console.log("Synchronize Database Schema (No Drop, No Alter)");
  initial(); // Run the initial function after schema synchronization
});

// routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/resRoutes")(app);
require("./routes/openaiRoutes")(app);

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);



// Check if initialization has been done
let hasInitialized = false;

function initial() {
  if (!hasInitialized) {
    Role.findOne({ where: { name: "user" } }).then((role) => {
      if (!role) {
        Role.create({ id: 1, name: "user" });
      }
    });

    Role.findOne({ where: { name: "moderator" } }).then((role) => {
      if (!role) {
        Role.create({ id: 2, name: "moderator" });
      }
    });

    Role.findOne({ where: { name: "admin" } }).then((role) => {
      if (!role) {
        Role.create({ id: 3, name: "admin" });
      }
    });

    hasInitialized = true;
  }
}
