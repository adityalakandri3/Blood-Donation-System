const BloodDonationCampModel = require("../model/BloodDonationCamp");
const Registration = require("../model/CampRegistration");

class CampRegistrationController {
  //camp Regsitration
  async campRegister(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      //find camp
      const camp = await BloodDonationCampModel.findById(id);
      if (!camp) {
        return res.status(400).json({
          status: false,
          message: "Camp not found.",
        });
      }

      //check if th camp is upcoming
      if (camp.status !== "upcoming") {
        return res.status(400).json({
          status: false,
          message: `Cannot register for the camp. Camp is ${camp.status}.`,
        });
      }
      //check if the user is already registered

      const existing = await Registration.findOne({
        user: userId,
        camp: id,
      }).populate("user", "name email")
      .populate("camp", "name");

      //if existing and previously cancelled
      if (existing) {
        if (existing.status === "cancelled") {
          existing.status = "registered";
          await existing.save();
          return res.status(200).json({
            status: true,
            message: "You have been re-registered for the camp.",
            data: existing,
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "You are already registered for this camp.",
          });
        }
      }

      //save registration data
      const data = new Registration({
        user: userId,
        camp: camp._id,
      });
      const registration = await data.save();

      const populatedData = await Registration.findById(data._id)
      .populate("user", "name email")
      .populate("camp", "name");

    return res.status(200).json({
      status: true,
      message: "You are registered for the camp successfully.",
      data: populatedData,
    });
    } catch (error) {
      return res.status(400).json({
        status: true,
        message: `Something went wrong during registration,${error.message}`,
      });
    }
  }
  //get registration
  async myRegistrations(req, res) {
    try {
      const userId = req.user._id;
      const registrations = await Registration.find({ user: userId }).populate(
        "camp"
      );
      if (registrations.length > 0) {
        return res.status(200).json({
          status: true,
          total: registrations.length,
          message: "Registered camps fetched successfully.",
          data: registrations,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "No Registrations Found.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching registrations, ${error.message}`,
      });
    }
  }
  //cancelRegistration
  async cancelRegistration(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      // Find the user's registration for the camp
      const registration = await Registration.findOne({
        user: userId,
        camp: id,
      });

      //if registration is there
      if (!registration) {
        return res.status(404).json({
          status: false,
          message: "Registration not found.",
        });
      }

      // Check if it's already cancelled or donated
      if (registration.status === "cancelled") {
        return res.status(400).json({
          status: false,
          message: "Registration is already cancelled.",
        });
      }
      if (registration.status === "donated") {
        return res.status(400).json({
          status: false,
          message: "You cannot cancel after donation.",
        });
      }

      // Updating  to cancelled
      registration.status = "cancelled";
      await registration.save();

      return res.status(200).json({
        status: true,
        message: "Registration cancelled successfully.",
        data: registration,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Error cancelling registration: ${error.message}`,
      });
    }
  }
}

module.exports = new CampRegistrationController();
