// module.exports = (sequelize, Sequelize) => {
//   const Question = sequelize.define("Question", {
//     text: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//   });

//   return Question;
// };


module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("Question", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Question.hasMany(sequelize.models.Answer, {
    as: 'answers', // Specify the alias as 'answers'
    foreignKey: 'QuestionId',
  });

  return Question;
};
