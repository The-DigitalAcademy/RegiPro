const db = require("../models");
const Response = db.response;
const User = db.user;

const Op = db.Sequelize.Op;

// @desc Create new response
// @route POST /responses
// @access Private
exports.createNewResponse = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  const { name, industry, description, isRegistered, hasBusinessPlan } =
    req.body;

  // Confirm data
  if (!name || !industry || !description || !isRegistered || !hasBusinessPlan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const duplicate = await Response.findOne({
      where: {
        name: {
          [Op.iLike]: name // Using Op.iLike for case-insensitive comparison
        }
      }
    });
  
    if (duplicate) {
      return res.status(409).json({ message: 'This business name exists, try another name' });
    }
    // Create and store the new response
    const response = await Response.create({
      userId,
      name,
      industry,
      description,
      isRegistered,
      hasBusinessPlan,
    });
    console.log(response);
    if (response) {
      // Created
      return res
        .status(201)
        .json({ message: "New response created", response });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid response data received" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get all responses
// @route GET /responses
// @access Private
exports.getAllResponses = async (req, res) => {
  try {
    // Get all responses from PostgreSQL using Sequelize
    const responses = await Response.findAll({
      where: { userId: req.userId }, // Assuming 'userId' is the foreign key in Response model
    });

    // If no responses
    if (!responses?.length) {
      return res.status(400).json({ message: "No responses found" });
    }

    // Add username to each response before sending the response
    const responsesWithUser = await Promise.all(
      responses.map(async (response) => {
        const user = await User.findByPk(response.userId); // Assuming there's a foreign key 'userId' in Response model
        console.log(user);

        return { ...response.toJSON(), user: user.firstname };
      })
    );

    res.json(responsesWithUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
