const mongoose = require("mongoose");

const AnzeigeSchema = mongoose.Schema({
  titel: {
    type: String,
    required: true,
  },
  beschreibung: {
    type: String,
    required: false,
    default: "Keine Beschreibung vorhanden",
  },
  datum: {
    type: String,
    required: false,
    default: new Date().toLocaleDateString(),
  },
  abholungsort: {
    type: String,
    required: true,
  },
  zustand: {
    type: String,
    required: false,
    default: "aktiv",
  },
  meldeAnzahl: {
    type: Number,
    required: false,
    default: 0,
  },
  Ersteller_Id: {
    type: String,
    required: true,
  },
  UK_Id: {
    type: String,
    required: true,
  },
});

const anzeige = mongoose.model("anzeige", AnzeigeSchema);

module.exports = anzeige;
