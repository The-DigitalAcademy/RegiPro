module.exports = (sequelize, Sequelize) => {
  const BusinessPlan = sequelize.define(
    "businesses",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return BusinessPlan;
};
