const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodRequestSchema = new Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },

    bloodRequested: {
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
      enum: ["pending", "accepted"],
      default: "pending",
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BloodRequestModel = mongoose.model("blood_requests", bloodRequestSchema);
module.exports = BloodRequestModel;
