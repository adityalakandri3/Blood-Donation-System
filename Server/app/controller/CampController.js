const BloodDonationCampModel = require("../model/BloodDonationCamp");
const path = require("path");
const fs = require("fs");
const Registration = require("../model/CampRegistration");

class CampController {
  //create camp
  async createCamp(req, res) {
    try {
      const { name, description, date, location, contactNumber } = req.body;

      //All fields are required
      if (
        !name ||
        !description ||
        !date ||
        !location?.state ||
        !location?.city ||
        !location?.address ||
        !contactNumber
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }
      const data = new BloodDonationCampModel({
        name,
        description,
        date,
        location: {
          state: location.state,
          city: location.city,
          address: location.address,
        },
        contactNumber,
        organizer: req.user._id,
      });

      if (req.file) {
        data.image = req.file.path;
      }
      //save data and return response
      const camp = await data.save();
      return res.status(200).json({
        status: true,
        message: "Camp Created Successfully.",
        data: data,
      });
    } catch (error) {
      //catching error if any
      return res.status(400).json({
        status: false,
        message: `Something went wrong while creating camp ${error.message}`,
      });
    }
  }
  //get all camps
  async getAllCamp(req, res) {
    try {
      const allCamp = await BloodDonationCampModel.find().populate(
        "organizer",
        "name"
      );
      return res.status(200).json({
        status: true,
        total: allCamp.length,
        message: "All Camps fetched successfully.",
        data: allCamp,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching camp ${error.message}`,
      });
    }
  }
  //get camp by id
  async getCampById(req, res) {
    try {
      const { id } = req.params;
      const getCampById = await BloodDonationCampModel.findById(id).populate(
        "organizer",
        "name"
      );
      if (!getCampById) {
        return res.status(400).json({
          status: false,
          message: "Camp Not Found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Camp fetched successfully.",
        data: getCampById,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching camp by id,${error.message}`,
      });
    }
  }
  //update camp
  async updateCamp(req, res) {
    try {
      const { id } = req.params;
      const { name, description, date, location, contactNumber, status } =
        req.body;

      //All fields are required
      if (
        !name ||
        !description ||
        !date ||
        !location?.state ||
        !location?.city ||
        !location?.address ||
        !contactNumber ||
        !status
      ) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }
      //get camp to delete image
      const getCamp = await BloodDonationCampModel.findById(id);
      if (!getCamp) {
        return res.status(400).json({
          status: false,
          message: "Camp not found",
        });
      }
      //deleting image
      if (getCamp.image) {
        fs.unlink(getCamp.image, (err) => {
          if (err) {
            console.log("Error deleting image.");
          } else {
            console.log("Image deleted.");
          }
        });
      }
      //updated data
      const updatedData = {
        name,
        description,
        date,
        location,
        contactNumber,
        status,
      };
      //updated image
      if (req.file) {
        updatedData.image = req.file.path;
      }

      const update = await BloodDonationCampModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (update) {
        return res.status(200).json({
          status: true,
          message: "Camp updated Successfully.",
          data: update,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while updating data.${error.message}`,
      });
    }
  }
  //delete camp
  async deleteCamp(req, res) {
    try {
      const { id } = req.params;
      //find camp by id
      const getCamp = await BloodDonationCampModel.findById(id);
      if (!getCamp) {
        return res.status(400).json({
          status: false,
          message: "Camp Not Found",
        });
      }
      //delete campImage
      if (getCamp.image) {
        fs.unlink(getCamp.image, (err) => {
          if (err) {
            console.error("failed to delete image");
          } else {
            console.log("Image deleted");
          }
        });
      }
      //delete camp
      await BloodDonationCampModel.findByIdAndDelete(id);

      return res.status(200).json({
        status: true,
        message: "Camp deleted successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Something went wrong while fetching camp by id,${error.message}`,
      });
    }
  }
  //get all registered users
  async getCampRegistrations(req, res) {
    try {
      const { id } = req.params;

      // Fetch registrations for the camp
      const registrations = await Registration.find({ camp: id })
        .populate("user", "name email")
        .populate("camp", "name date");

      if (!registrations.length) {
        return res.status(404).json({
          status: false,
          message: "No registrations found for this camp.",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Registrations fetched successfully.",
        data: registrations,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Failed to fetch registrations: ${error.message}`,
      });
    }
  }

  //per user
  async getRegistrationsByUser(req, res) {
    try {
      const { id } = req.params;

      const registrations = await Registration.find({ user: id })
        .populate("camp", "name date")
        .populate("user", "name email");

      if (!registrations.length) {
        return res.status(404).json({
          status: false,
          message: "No registrations found for this user.",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Registrations fetched successfully.",
        data: registrations,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Error fetching registrations: ${error.message}`,
      });
    }
  }

  //update Registration Status
  // Update Registration Status
  async updateRegistrationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      //status can only be changed to donated
      if (status !== "donated") {
        return res.status(400).json({
          status: false,
          message: "The status can only be updated to 'donated'.",
        });
      }

      // Find registration to update
      const registration = await Registration.findById(id);
      if (!registration) {
        return res.status(400).json({
          status: false,
          message: "Registration not found.",
        });
      }

      // Check if the status is already donated
      if (registration.status === "donated") {
        return res.status(400).json({
          status: false,
          message: "Status is already 'donated'. Cannot change again.",
        });
      }

      // Check if registration status is registered  before updating to donated
      if (registration.status !== "registered") {
        return res.status(400).json({
          status: false,
          message: `Cannot update. Current status is '${registration.status}'. Only 'registered' statuses can be updated to 'donated'.`,
        });
      }

      // Update the status to 'donated'
      registration.status = "donated";
      await registration.save();

      return res.status(200).json({
        status: true,
        message: "Registration status successfully updated to donated.",
        data: registration,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Error updating registration status: ${error.message}`,
      });
    }
  }
}

module.exports = new CampController();
