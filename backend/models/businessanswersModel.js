module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define("Answer", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Answer;
};
