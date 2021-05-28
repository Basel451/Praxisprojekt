const mongoose = require("mongoose");

const FavoritlisteSchema = mongoose.Schema({
  P_Id: {
    type: String,
    required: true,
    uniqe: true,
  },
});

const favoritliste = mongoose.model("favoritliste", FavoritlisteSchema);

module.exports = favoritliste;
