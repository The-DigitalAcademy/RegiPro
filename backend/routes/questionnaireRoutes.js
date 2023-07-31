const questionController = require('../controllers/questionnaireControllers');

module.exports = function (app) {
  // create new Questions
  app.post('/api/questions',questionController.create);
  // Get all the questions
  app.get('/api/questions', questionController.findAll);
};



