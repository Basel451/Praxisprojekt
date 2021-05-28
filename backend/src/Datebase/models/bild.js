const mongoose = require("mongoose");

const BildSchema = mongoose.Schema({
  bild: {
    type: String,
    required: true,
  },
  A_Id: {
    type: String,
    required: true,
  },
});

const bild = mongoose.model("bild", BildSchema);

module.exports = bild;
