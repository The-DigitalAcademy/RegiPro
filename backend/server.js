require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 5001;

console.log(process.env.NODE_ENV);

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

// database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false, logging: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  // initial();
});

// routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/resRoutes")(app);

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });

//     Role.create({
//       id: 2,
//       name: "moderator"
//     });

//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }
