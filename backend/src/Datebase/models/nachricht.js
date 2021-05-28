const mongoose = require("mongoose");

const NachrichtSchema = mongoose.Schema({
  datum: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  Absender_Id: {
    type: String,
    required: true,
  },
  Empfaenger_Id: {
    type: String,
    required: true,
  },
  A_Id: {
    type: String,
    required: true,
  },
});

const nachricht = mongoose.model("nachricht", NachrichtSchema);

module.exports = nachricht;
