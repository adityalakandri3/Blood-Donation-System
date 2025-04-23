const BloodRequestModel = require("../model/BloodRequest");

class BloodRequestController {
  // Create a blood request
  async createBloodRequest(req, res) {
    try {
      const { recipent, bloodType, location } = req.body;

      const bloodRequest = new BloodRequestModel({
        recipent,
        bloodType,
        location,
      });

      await bloodRequest.save();
      res
        .status(201)
        .json({ message: "Blood request created successfully", bloodRequest });
    } catch (error) {
      res.status(500).json({ message: "Error creating blood request", error });
    }
  }

  // Get all blood requests
  async getAllBloodRequests(req, res) {
    try {
      const bloodRequests = await BloodRequestModel.find();
      res.status(200).json({ bloodRequests });
    } catch (error) {
      res.status(500).json({ message: "Error fetching blood requests", error });
    }
  }

  // Update blood request status
  async updateBloodRequestStatus(req, res) {s
    try {
      const { id } = req.params;
      const { status } = req.body;

      const bloodRequest = await BloodRequestModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!bloodRequest) {
        return res.status(404).json({ message: "Blood request not found" });
      }

      res.status(200).json({ message: "Blood request updated", bloodRequest });
    } catch (error) {
      res.status(500).json({ message: "Error updating blood request", error });
    }
  }

  // Get blood requests by status
  async getBloodRequestsByStatus(req, res) {
    try {
      const { status } = req.params;
      const bloodRequests = await BloodRequestModel.find({ status });

      res.status(200).json({ bloodRequests });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching blood requests by status", error });
    }
  }
}

module.exports = new BloodRequestController();
