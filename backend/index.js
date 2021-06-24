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

app.use("/", require("./src/Route/EinloggenRoute"));

app.listen(3001, () => {
  console.log("Server is listening on Port 3001...");
});

