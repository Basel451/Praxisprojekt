const mongoose = require("mongoose");

const KategorieSchema = mongoose.Schema({
  bezeichnung: {
    type: String,
    required: true,
    uniqe: true,
  },
});

const kategorie = mongoose.model("kategorie", KategorieSchema);

module.exports = kategorie;
