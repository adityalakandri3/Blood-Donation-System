const BloodRequest = require("../model/BloodRequest");
const User = require("../models/User");

class BloodRequestController {
  // Create Blood Request
  static async createRequest(req, res) {
    const { bloodType, location } = req.body;
    try {
      const request = new BloodRequest({
        recipent: req.user.id,
        bloodType,
        location
      });
      await request.save();
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get My Blood Requests
  static async getMyRequests(req, res) {
    try {
      const requests = await BloodRequest.find({ recipent: req.user.id });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update Blood Request
  static async updateRequest(req, res) {
    try {
      const request = await BloodRequest.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete Blood Request
  static async deleteRequest(req, res) {
    try {
      await BloodRequest.findByIdAndDelete(req.params.id);
      res.json({ message: "Request deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Find Matching Donors
  static async findMatchingDonors(req, res) {
    const { bloodType, location } = req.query;
    try {
      const donors = await User.find({ role: "donor", bloodType, location })
        .select("-password");
      res.json(donors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BloodRequestController();
