// // models/answer.js

// const { DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../models/index')

// const Answer = sequelize.define('Answer', {
//   text: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   isCorrect: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
// });

// module.exports = Answer;

// // Require the Question model and define the association function
// const Question = require('./question');

// // Function to define the associations after both models are loaded
// const associateModels = () => {
//   Answer.belongsTo(Question, { foreignKey: 'questionId' });
// };

// // Export the association function
// module.exports.associate = associateModels;



module.export = (sequelize, Sequelize) => {
    const User = sequelize.define('Answer', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
              },
    });
    module.exports = Answer;
};
// Require the Question model and define the association function
const Question = require('./question');

// Function to define the associations after both models are loaded
const associateModels = () => {
      Answer.belongsTo(Question, { foreignKey: 'questionId' });
    };
    
    // Export the association function
    module.exports.associate = associateModels;