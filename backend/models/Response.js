module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define(
      "responses",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        industry: {
          type: Sequelize.STRING,
          allowNull: false,
        },
  
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isRegistered: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hasBusinessPlan: {
          type: Sequelize.STRING,
          allowNull: false,
         
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Response;
  };