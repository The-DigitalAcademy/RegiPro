const  Answer = require('../models/businessanswersModel')
const Question = require('../models/businessquestionsModel')

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({ include: 'answers' }); 
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving questions.' });
  }
};
 
  
exports.createQuestion = async (req, res) => {
  const { text, answers } = req.body; // Add 'answers' variable here

  try {
    const question = await Question.create({ text });

    if (answers && Array.isArray(answers)) {
      await Promise.all(
        answers.map(async (answerText) => {
          await Answer.create({ text: answerText, QuestionId: question.id });
        })
      );
    }

    res.json(question);
  } catch (err) {
    res.status(400).json({ error: 'Error creating question.' });
  }
};
