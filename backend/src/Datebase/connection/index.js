const mongoose = require("mongoose");
const dotenv = require("dotenv").config(); // für den Zugriff auf die Env-Datei
/**
 * Connect funktion: Verbindet sich mit der Datenbank
 * connection.once öffnet den Pfad, sodass wir bspw. queries abfragen können.
 */

async function connectDatabase() {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB wurde verbunden");
    })
    .catch((err) => {
      console.log(err);
    });

  await mongoose.connection.once("open", () => {
    console.log("Database connection established");
  });
}

module.exports = { connectDatabase };
