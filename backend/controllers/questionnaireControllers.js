// const Question = require('../models/questionnaire')

// // Create and Save a new Question
// exports.create = (req, res) => {
//   const questionData = req.body;

//   // Create a question using Sequelize's create method
//   Question.create(questionData)
//     .then((question) => {
//       res.status(201).send(question);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while creating the questions.',
//       });
//     });
// };

// // Find all questions
// exports.findAll = (req, res) => {
//   Question.findAll()
//     .then((questions) => {
//       res.send(questions);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving data.',
//       });
//     });
// };


// questionnaireControllers.js
const Question = require('../models/questionnaire');

// Create and Save a new Question
exports.create = (req, res) => {
  const questionData = req.body;

  // Create a question using the custom createQuestion method
  Question.createQuestion(questionData)
    .then((question) => {
      res.status(201).send(question);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the question.',
      });
    });
};


