const BloodDonationCampModel = require("../model/BloodDonationCamp");

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
      const camp = new BloodDonationCampModel({
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

      //save data and return response
      const data = await camp.save();
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

  //all events
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

  //get events by id
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
}

module.exports = new CampController();
