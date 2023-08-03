const db = require("../models");
const Response = db.response;

const Op = db.Sequelize.Op;

// exports.getQuestions = async (req, res) => {
//   try {
//     const questions = await Question.findAll({ include: 'answers' });
//     res.json(questions);
//   } catch (err) {
//     console.error('Error retrieving questions:', err);
//     res.status(500).json({ error: 'Error retrieving questions.' });
//   }
// };

// exports.createQuestion = async (req, res) => {
//   const { text, answers } = req.body;

//   if (!text || typeof text !== 'string') {
//     return res.status(400).json({ error: 'Question text is required and must be a string.' });
//   }

//   try {
//     const question = await Question.create({ text });

//     if (answers && Array.isArray(answers)) {
//       await Promise.all(
//         answers.map(async (answerText) => {
//           await Answer.create({ text: answerText, QuestionId: question.id });
//         })
//       );
//     }

//     res.json(question);
//   } catch (err) {
//     console.error('Error creating question:', err);
//     res.status(500).json({ error: 'Error creating question.' });
//   }
// };

// @desc Create new Response
// @route POST /Responses
// @access Private
exports.createNewResponse = async (req, res) => {
  const { name, industry, description, isRegistered, hasBusinessPlan } = req.body;
  if (!name || !industry || !description || !isRegistered || !hasBusinessPlan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await Response.create({ name, industry, description, isRegistered, hasBusinessPlan});

  res.status(201).json({ message: "New note created" });
};
