const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    camp: {
      type: Schema.Types.ObjectId,
      ref: "camp",
      required: true,
    },
    status: {
      type: String,
      enum: ["registered", "donated", "cancelled"],
      default: "registered",
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RegistrationModel = mongoose.model("registration", RegistrationSchema);
module.exports = RegistrationModel;
