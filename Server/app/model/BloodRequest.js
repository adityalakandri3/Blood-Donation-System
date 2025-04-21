const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodRequestSchema = new Schema(
  {
    recipent: {
      type: String,
      required: true,
    },

    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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
    },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "rejected"],
      default: "pending",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BloodRequestModel = mongoose.model("recipient", bloodRequestSchema);
module.exports = BloodRequestModel;
