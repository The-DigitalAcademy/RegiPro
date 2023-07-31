// models/questionnaire.js
const { DataTypes } = require('sequelize');
const db = require('./index');

const Question = db.define('question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Question;

