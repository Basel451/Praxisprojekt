const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  datum: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  uhrzeit: {
    type: String,
    required: true,
    default: new Date().toLocaleTimeString(),
  },
  msg: {
    type: String,
    required: true,
    default: ".",
  },
  type: {
    type: String,
    required: false,
    default: "",
  },
  N_Id: {
    type: String,
    required: true,
  },
});

const chat = mongoose.model("chat", ChatSchema);

module.exports = chat;
