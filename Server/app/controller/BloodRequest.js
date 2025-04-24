const BloodRequestModel = require("../model/BloodRequest");

class BloodRequestController {
  // Create a blood request
  async createBloodRequest(req, res) {
    try {
      // Use the logged-in user's ID for recipient
      const recipient = req.user; 
      // console.log(req.user);
      // req.user.id comes from AuthCheck middleware
      
      const { bloodType, location } = req.body;

      // Create a new blood request with the user's ID as recipent
      const bloodRequest = new BloodRequestModel({
        recipient,
        bloodType,
        location,
      });

      await bloodRequest.save();

      res.status(201).json({
        message: "Blood request created successfully",
        bloodRequest,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating blood request",
        error,
      });
    }
  }

  // Get all blood requests (for donors: only their blood type's requests)
  async getAllBloodRequests(req, res) {
    try {
      const userBloodType = req.user.bloodType; // Assuming bloodType is part of user profile

      // Fetch blood requests that match the donor's blood type
      const bloodRequests = await BloodRequestModel.find({ bloodType: userBloodType });

      res.status(200).json({ bloodRequests });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching blood requests",
        error,
      });
    }
  }

  // Update blood request status (only the recipient or an authorized user can update)
  async updateBloodRequestStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Fetch the blood request to verify ownership (recipient should be the logged-in user)
      const bloodRequest = await BloodRequestModel.findById(id);

      if (!bloodRequest) {
        return res.status(404).json({ message: "Blood request not found" });
      }

      // Check if the logged-in user is the recipient
      if (bloodRequest.recipent.toString() !== req.user.id) {
        return res.status(403).json({
          message: "You are not authorized to update this request's status",
        });
      }

      // Update the status of the blood request
      bloodRequest.status = status;
      await bloodRequest.save();

      res.status(200).json({ message: "Blood request status updated", bloodRequest });
    } catch (error) {
      res.status(500).json({
        message: "Error updating blood request status",
        error,
      });
    }
  }

  // Get blood requests by status
  async getBloodRequestsByStatus(req, res) {
    try {
      const { status } = req.params;

      // Fetch all blood requests filtered by status
      const bloodRequests = await BloodRequestModel.find({ status });

      res.status(200).json({ bloodRequests });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching blood requests by status",
        error,
      });
    }
  }
}

module.exports = new BloodRequestController();