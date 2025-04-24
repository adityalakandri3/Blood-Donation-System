const BloodRequestModel = require("../model/BloodRequest");

class BloodRequestController {
  // Create a blood request
  async createBloodRequest(req, res) {
    try {
      const recipient = req.user._id;
      const { bloodType, location } = req.body;

      //all fields are required
      if (!bloodType || !location) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      //creating request
      const bloodRequestData = new BloodRequestModel({
        recipient,
        bloodType,
        location,
      });

      //saving blood request data
      const bloodRequest = await bloodRequestData.save();
      if (bloodRequest) {
        return res.status(200).json({
          status: true,
          message: "Blood Request created successfully.",
          data: bloodRequest,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while creating blood request,${err.message}`,
      });
    }
  }

  // Get all blood request for the one who has created
  async getAllBloodRequests(req, res) {
    try {
      const userId = req.user._id
      //fiding user id 
      const bloodRequests = await BloodRequestModel.find({
        recipient:userId,
      });
      //if found fetch data
      if (bloodRequests) {
        return res.status(200).json({
          status: true,
          message: "Blood Requests fetched successfully.",
          data: bloodRequests,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching blood requests,${error.message}`,
      });
    }
  }

  // Update blood request status
  async updateBloodRequestStatus(req, res) {
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
