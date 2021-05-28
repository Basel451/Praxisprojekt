const mongoose = require("mongoose");
const argon2 = require("argon2");

const BenutzerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vorname: {
    type: String,
    required: true,
  },
  telefonnummer: {
    type: String,
    required: false,
    default: "",
  },
  ort: {
    type: String,
    required: false,
    default: "",
  },
  benutzername: {
    type: String,
    required: false,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  passwort: {
    type: String,
    required: true,
  },
});

BenutzerSchema.pre("save", async function (next) {
  if (!this.benutzername) {
    this.benutzername = this.vorname + " " + this.name;
  }
  const hash = await argon2.hash(this.passwort);
  this.passwort = hash;
  next();
});

const benutzer = mongoose.model("Benutzer", BenutzerSchema);

module.exports = benutzer;
