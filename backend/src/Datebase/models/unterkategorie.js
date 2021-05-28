const mongoose = require("mongoose");

const UnterkategorieSchema = mongoose.Schema({
  bezeichnung: {
    type: String,
    required: true,
    uniqe: true,
  },
  k_id: {
    type: String,
    required: true,
  },
});

const unterkategorie = mongoose.model("unterkategorie", UnterkategorieSchema);

module.exports = unterkategorie;
