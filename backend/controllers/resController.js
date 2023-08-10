const db = require("../models");
const Response = db.response;
const User = db.user

const Op = db.Sequelize.Op;

exports.createNewResponse = async (req, res) => {
  const { userId, name, industry, description, isRegistered, hasBusinessPlan } = req.body

  // Confirm data
  if (!userId || !name || !industry || !description || !isRegistered || !hasBusinessPlan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for the user
    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Create and store the new note
    const response = await Response.create({ userId, name, industry, description, isRegistered, hasBusinessPlan });

    if (note) { // Created
        return res.status(201).json({ message: 'New note created' });
    } else {
        return res.status(400).json({ message: 'Invalid note data received' });
    }
} catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
}
  }

