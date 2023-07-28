// models/question.js

// const { Sequelize } = require(".");

// const { DataTypes } = require('sequelize');
// const sequelize = require('../models/index');

// const Question = sequelize.define('Question', {
//   text: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Question;

// // Require the Answer model and define the association function
// const Answer = require('./answer');

// // Function to define the associations after both models are loaded
// const associateModels = () => {
//   Question.hasMany(Answer, { as: 'answers' });
// };

// // Export the association function
// module.exports.associate = associateModels;

module.export = (sequelize, Sequelize) => {
    const User = sequelize.define('Question', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    module.exports = Question;
};
// Require the Answer model and define the association function
const Answer = require('./answer');
// Function to define the associations after both models are loaded
const associateModels = () => {
  Question.hasMany(Answer, { as: 'answers' });
};
 // Export the association function
module.exports.associate = associateModels;




