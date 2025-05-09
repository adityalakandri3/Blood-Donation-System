const BloodRequestModel = require("../model/BloodRequest");

class BloodRequestController {
  // Create  blood request
  async createBloodRequest(req, res) {
    try {
      const recipient = req.user._id;
      const { bloodRequested, location } = req.body;

      //all fields are required
      if (!bloodRequested || !location) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      //creating request
      const bloodRequestData = new BloodRequestModel({
        recipient,
        bloodRequested,
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

  // Get all blood request
  async getAllBloodRequests(req, res) {
    try {
      const userId = req.user._id;
      //finding user id
      const bloodRequests = await BloodRequestModel.find({
        recipient: userId,
      })
        .populate("donor", "name email")
        .populate("recipient", "name email");
      //if found fetch data
      if (bloodRequests) {
        return res.status(200).json({
          status: true,
          message: "Blood Requests fetched successfully.",
          total: bloodRequests.length,
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

  //getBloodRequest by id
  async getAllBloodRequestById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      //finding user id
      const bloodRequests = await BloodRequestModel.findOne({
        recipient: userId,
        _id: id,
      })
        .populate("donor", "name email")
        .populate("recipient", "name email");
      //if found fetch data
      if (!bloodRequests) {
        return res.status(400).json({
          status: false,
          message: "Blood Request not found.",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Blood Request By id fetched successfully.",
        data: bloodRequests,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching blood requests,${error.message}`,
      });
    }
  }

  // Update blood request data
  async updateBloodRequest(req, res) {
    try {
      const { id } = req.params;
      const { bloodRequested, location } = req.body;
      if (!bloodRequested || !location.state || !location.city) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      const updatedData = {
        bloodRequested,
        location,
      };

      const bloodRequest = await BloodRequestModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!bloodRequest) {
        return res.status(400).json({
          status: false,
          message: "Blood request not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Blood request updated",
        data: bloodRequest,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Error updating blood request,${error.message}`,
      });
    }
  }

  // Delete blood Request
  async deleteBloodRequest(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const deleteRequest = await BloodRequestModel.findByIdAndDelete({
        recipient: userId,
        _id: id,
      });
      if (deleteRequest) {
        return res.status(200).json({
          status: true,
          message: "Blood Request deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while deleting request.${error.message}`,
      });
    }
  }
}

module.exports = new BloodRequestController();
