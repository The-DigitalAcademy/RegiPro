//importing modules
const {Sequelize, DataTypes} = require('sequelize')

const dbConfig = require('../config/dbconfig')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // You may need to adjust this option based on your SSL certificate configuration
        }
      },

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
  

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.users = require('../models/userModel') (sequelize, DataTypes)

//exporting the module
module.exports = db


