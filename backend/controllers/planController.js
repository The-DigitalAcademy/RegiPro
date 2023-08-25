const db = require("../models");
const Response = db.response;
const Business = db.business;

// @desc Create new business plan
// @route POST /business
// @access Private
exports.createNewBusiness = async (req, res) => {
  const responseId = req.responseId;
  console.log(responseId);

  const { url } = req.body;

  // Confirm data
  if (!url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for the user
    const response = await Response.findByPk(responseId);

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    // Create and store the new response
    const business = await Business.create({
      responseId,
      url
    
    });
    console.log(response);
    if (business) {
      // Created
      return res
        .status(201)
        .json({ message: "New business plan created", business });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid response data received" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Assuming you have already imported the necessary dependencies and models

// @desc Get business by ID
// @route GET /business/:id
// @access Private
exports.getBusinessById = async (req, res) => {
    const businessId = req.params.id; // Extract business ID from request params
  
    try {
      // Find the business by ID
      const business = await Business.findByPk(businessId, {
        include: [{ model: Response, as: 'response' }] // Include associated response
      });
  
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      return res.status(200).json({ business });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  