const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodDonationCampSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    description: {
      type: String,
      default: "",
    },

    contactNumber: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BloodDonationCampModel = mongoose.model("camp", bloodDonationCampSchema);
module.exports = BloodDonationCampModel;
