const BloodRequestModel = require("../model/BloodRequest");

class DonorController {
  //get matching request by donor blood type
  async getMatchingRequestForDonor(req, res) {
    try {
      const donorBloodType = req.user.bloodType;
      //find blood thats donor blood type and status is pending
      const requests = await BloodRequestModel.find({
        bloodRequested: donorBloodType,
      }).populate("recipient", "name email ");
      //if not found
      if (!requests) {
        return res.status(200).json({
          status: true,
          message: "No requests found.",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Matching blood requests fetched successfully.",
        total: requests.length,
        data: requests,
      });
    } catch (error) {
      returnres.status(400).json({
        status: false,
        message: `Error fetching blood requests: ${error.message}`,
      });
    }
  }
  //get blood request for donor by id
  async getMatchingRequestForDonorById(req, res) {
    try {
      const { id } = req.params;
      const donorId = req.user._id;
      const donorBloodType = req.user.bloodType;

      const bloodRequest = await BloodRequestModel.findOne({
        _id: id,
        $or: [
          { status: "pending", bloodRequested: donorBloodType },
          { status: "accepted", donor: donorId },
        ],
      }).populate("recipient", "name email")
      .populate("donor", "name email");

      if (!bloodRequest) {
        return res.status(404).json({
          status: false,
          message: "Blood request not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Blood request fetched successfully.",
        data: bloodRequest,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: `Error fetching blood request: ${error.message}`,
      });
    }
  }
  //accept request
  async acceptBloodRequest(req, res) {
    try {
      const { id } = req.params;
      const donorId = req.user._id;

      let bloodRequest = await BloodRequestModel.findOneAndUpdate(
        { _id: id, status: "pending" },
        { status: "accepted", donor: donorId },
        { new: true }
      );

      if (!bloodRequest) {
        return res.status(404).json({
          status: false,
          message: "Blood request not found or already accepted.",
        });
      }

      bloodRequest = await bloodRequest.populate("donor", "name email");
      res.status(200).json({
        status: true,
        message: "Blood request accepted successfully.",
        data: bloodRequest,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: `Error accepting blood request: ${error.message}`,
      });
    }
  }
}

module.exports = new DonorController();
