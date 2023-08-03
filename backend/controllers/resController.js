const db = require("../models");
const Response = db.response;

const Op = db.Sequelize.Op;

exports.createNewResponse = async (req, res) => {
  const { name, industry, description, isRegistered, hasBusinessPlan } = req.body;
  if (!name || !industry || !description || !isRegistered || !hasBusinessPlan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await Response.create({ name, industry, description, isRegistered, hasBusinessPlan});

  res.status(201).json({ message: "New note created" });
};
