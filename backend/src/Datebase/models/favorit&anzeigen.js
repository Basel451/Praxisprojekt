const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  P_Id: {
    type: String,
    required: true,
  },
  A_Id: {
    type: String,
    required: true,
  },
});

const favoritListe_Anzeige = mongoose.model("favoritListe_Anzeige", Schema);

module.exports = favoritListe_Anzeige;
