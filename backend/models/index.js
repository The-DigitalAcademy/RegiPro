const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,   
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  
  // Test the connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
  

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User.js")(sequelize, Sequelize);
db.role = require("../models/Role.js")(sequelize, Sequelize);
db.response = require("../models/Response.js")(sequelize, Sequelize);

// User and Role associations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// User and Response associations
db.user.hasMany(db.response, {
  foreignKey: "userId",
  as: "responses"
})
db.response.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
})

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
