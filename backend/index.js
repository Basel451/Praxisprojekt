const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
   "origin": "*",
  })
);

// Verbindung zur DB erstellen
const connection = require("./src/Datebase/connection");
connection.connectDatabase();

// Verbindung zu Einloggen-Datei

app.use("/", require("./src/Route/EinloggenRoute"));
/*
const einloggen = require("./src/Route/Einloggen/index");
app.post("/einloggen", einloggen);*/

app.listen(3001, () => {
  console.log("Server is listening on Port 3001...");
});

/*
// Verbindung zu Registrieren-Datei
const registrieren = require("./src/Route/Registrieren");
app.post("/registrieren", registrieren);

// Verbindung zu Ausloggen-Datei
const ausloggen = require("./src/Route/Ausloggen");
app.post("/ausloggen", ausloggen);

// Verbindung zu Home-Datei
const home = require("./src/Route/Home");
app.post("/", home);

// Verbindung zu Profil-Datei
const profil = require("./src/Route/Profil");
app.post("/profil", profil);

// Verbindung zu Anzeige-Datei
const anzeige = require("./src/Route/Anzeige");
app.post("/anzeige/:id", anzeige);




// Verbindung zu Anzeige-Datei
const meineAnzeige = require("./src/Route/Anzeige");
app.post("/meineAnzeige", meineAnzeige);


// Verbindung zu AnzeigeErstellen-Datei
const erstellen = require("./src/Route/AnzeigeErstellen");
app.post("/Anzeige/erstellen", erstellen);

// Verbindung zu AnzeigeBearbeiten-Datei
const bearbeiten = require("./src/Route/AnzeigeBearbeiten");
app.post("/Anzege/bearbeiten/:id", bearbeiten);
*/
