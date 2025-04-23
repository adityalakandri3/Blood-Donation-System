const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegistrationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: Schema.Types.ObjectId,
    ref: "camp",
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const RegistrationModel = mongoose.model("registration", RegistrationSchema);
module.exports = RegistrationModel;
