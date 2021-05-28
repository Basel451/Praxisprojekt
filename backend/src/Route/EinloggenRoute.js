const benutzer = require("../Datebase/models/benutzer");
const anzeige = require("../Datebase/models/anzeige");
const nachricht = require("../Datebase/models/nachricht");
const chat = require("../Datebase/models/chat");
const bild = require("../Datebase/models/bild");
const unterkategorie = require("../Datebase/models/unterkategorie");
const kategorie = require("../Datebase/models/kategorie");
const favoritListe_Anzeige = require("../Datebase/models/favorit&anzeigen");
const argon2 = require("argon2");
const express = require("express");
const router = express.Router();

// Raute für Einloggen
router.route("/einloggen").post(async function (req, res) {
  const findbenutzer = await benutzer.findOne({ mail: req.body.email });
  if (!findbenutzer) {
    return res.status(200).json({
      message: "ungültige Mail",
    });
  }
  if (await argon2.verify(findbenutzer.passwort, req.body.passwort)) {
    return res.status(200).json({
      message: "erfolgreich",
      P_id: findbenutzer._id,
      benutzername: findbenutzer.benutzername,
    });
  }
  return res.status(401).json({
    message: "ungültiges Passwort",
  });
});

// Raute für Registrieren
router.route("/registrieren").post(async (req, res) => {
  await new benutzer(req.body).save();
  return res.status(200).json({
    message: "erfolgreich",
  });
});

// Raute für die Anzeigen
router.route("/anzeiges").post(async (req, res) => {
  const { index } = req.body;

  const findanzeige = await anzeige.find(
    {}, //Bedingung bspw: Author ist "basel"
    null,
    { sort: { date: "asc" }, skip: index, limit: 10 },
    function (error, posts) {
      if (error) return `${error} while finding from post collection`;

      return posts; // posts with sorted length of 20
    }
  );

  const array = [];
  var i = 0;
  while (i < findanzeige.length) {
    const findbild = await bild.find({ A_Id: findanzeige[i]._id });
    array.push({
      anzeige: findanzeige[i],
      bilder: findbild,
    });
    i++;
  }

  const ret = {
    array: array,
    index: index + array.length,
  };
  return res.status(200).json(ret);
});

// Raute für die einzlne Anzeige
router.route("/einzlneAnzeiges").post(async (req, res) => {
  const findanzeige = await anzeige.findOne({ _id: req.body.A_id });
  const finduk = await unterkategorie.findOne({
    _id: findanzeige.UK_Id,
  });
  const findk = await kategorie.findOne({ _id: finduk.k_id });
  const findbild = await bild.find({ A_Id: findanzeige._id });
  const findbenutzer = await benutzer.findOne({
    _id: findanzeige.Ersteller_Id,
  });

  return res.status(200).json({
    id: findanzeige._id,
    titel: findanzeige.titel,
    beschreibung: findanzeige.beschreibung,
    datum: findanzeige.datum,
    abholungsort: findanzeige.abholungsort,
    uk_bezeichnung: finduk.bezeichnung,
    k_bezeichnung: findk.bezeichnung,
    k_id: findk._id,
    uk_id: findanzeige.UK_Id,
    bilder: findbild,
    benutzername: findbenutzer.benutzername,
    P_id: findbenutzer._id,
    telefonnummer: findbenutzer.telefonnummer,
  });
});

//Raute für die Bearbeitung einer Anzeige
router.route("/anzeigespeichern").post(async function (req, res) {
  await anzeige.updateOne(
    { _id: req.body.A_id },
    {
      titel: req.body.titel,
      beschreibung: req.body.beschreibung,
      abholungsort: req.body.abholungsort,
      UK_Id: req.body.UK_Id,
    }
  );
  await bild.deleteMany({ A_Id: req.body.A_id });
  var i = 0;
  while (i < req.body.bild.length) {
    await new bild({
      bild: req.body.bild[i],
      A_Id: req.body.A_id,
    }).save();
    i++;
  }
  return res.status(200).json({
    message: "erfolgreich",
  });
});
// Raute für die Profilanfrage
router.route("/profilanfrage").post(async function (req, res) {
  const findbenutzer = await benutzer.findOne({ _id: req.body.id });
  return res.status(200).json({
    name: findbenutzer.name,
    vorname: findbenutzer.vorname,
    telefonnummer: findbenutzer.telefonnummer,
    wohnort: findbenutzer.ort,
    mail: findbenutzer.mail,
    benutzername: findbenutzer.benutzername,
  });
});

//Raute für die Bearbeitung des Profils
router.route("/profilbearbeiten").post(async function (req, res) {
  if (req.body.passwort !== "*****") {
    const hash = await argon2.hash(req.body.passwort);
    await benutzer.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        vorname: req.body.vorname,
        telefonnummer: req.body.telefonnummer,
        ort: req.body.wohnort,
        benutzername: req.body.benutzername,
        mail: req.body.mail,
        passwort: hash,
      }
    );
  } else {
    await benutzer.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        vorname: req.body.vorname,
        telefonnummer: req.body.telefonnummer,
        ort: req.body.wohnort,
        benutzername: req.body.benutzername,
        mail: req.body.mail,
      }
    );
  }
  return res.status(200).json({
    message: "erfolgreich",
  });
});

// Raute für die Favoritliste
router.route("/merkliste").post(async (req, res) => {
  const findBenutzerAnzeige = await favoritListe_Anzeige.findOne({
    A_Id: req.body.A_id,
    P_Id: req.body.id,
  });
  if (findBenutzerAnzeige == null) {
    new favoritListe_Anzeige({
      P_Id: req.body.id,
      A_Id: req.body.A_id,
    }).save();
  }
  return res.status(200).json({
    message: "erfolgreich",
  });
});

// Raute für das Löschen einer Anzeige in Favoritliste
router.route("/merklisteloeschen").post(async (req, res) => {
  await favoritListe_Anzeige.deleteOne({
    A_Id: req.body.A_id,
    P_Id: req.body.id,
  });
  return res.status(200).json({
    message: "erfolgreich",
  });
});

// Raute für Anfrage der Anzeige in einer Favoritliste
router.route("/favoritlisteAnfrage").post(async (req, res) => {
  const findAnzeigenAusFL = await favoritListe_Anzeige.find({
    P_Id: req.body.P_id,
  });
  const array = [];
  var i = 0;
  while (i < findAnzeigenAusFL.length) {
    var j = 0;
    const findanzeige = await anzeige.find({ _id: findAnzeigenAusFL[i].A_Id });
    while (j < findanzeige.length) {
      const findbild = await bild.find({ A_Id: findanzeige[j]._id });
      array.push({
        anzeige: findanzeige[j],
        bilder: findbild,
      });
      j++;
    }
    i++;
  }
  return res.status(200).json(array);
});

// Raute für Anbieterprofilanfrage
router.route("/anbieterprofil").post(async (req, res) => {
  const findbenutzer = await benutzer.findOne({ _id: req.body.P_id });
  const findanzeige = await anzeige.find({ Ersteller_Id: req.body.P_id });
  const array = [];
  var i = 0;
  while (i < findanzeige.length) {
    const findbild = await bild.find({ A_Id: findanzeige[i]._id });
    array.push({
      anzeige: findanzeige[i],
      bilder: findbild,
    });
    i++;
  }

  return res.status(200).json({
    anzeigen: array,
    benutzername: findbenutzer.benutzername,
  });
});

// Raute für das Löschen einer Anzeige
router.route("/anzeigeloeschen").post(async (req, res) => {
  await anzeige.deleteOne({ _id: req.body.A_id });
  await bild.deleteMany({ A_Id: req.body.A_id });
  await favoritListe_Anzeige.deleteMany({
    A_Id: req.body.A_id,
  });
});

// Raute für das Anfragen von Kategorien
router.route("/kategorieAnfrage").post(async (req, res) => {
  const findkategorie = await kategorie.find({});
  const findunterkategorie = await unterkategorie.find({});
  return res.status(200).json({
    kategorie: findkategorie,
    unterkategorie: findunterkategorie,
  });
});

// Raute für das Anfragen von Unterkategorien
router.route("/unterkategorieAnfrage").post(async (req, res) => {
  const findkategorie = await kategorie.find({
    bezeichnung: req.body.K_bezeichnung,
  });
  const findunterkategorie = await unterkategorie.find({
    k_id: findkategorie._id,
  });
  return res.status(200).json(findunterkategorie);
});

// Raute für Erstellen einer Anzeige
router.route("/anzeigeerstellen").post(async (req, res) => {
  const erstellanzeige = await new anzeige({
    titel: req.body.titel,
    abholungsort: req.body.abholungsort,
    Ersteller_Id: req.body.Ersteller_Id,
    UK_Id: req.body.UK_Id,
    beschreibung: req.body.beschreibung,
  }).save();
  var i = 0;
  while (i < req.body.bild.length) {
    await new bild({
      bild: req.body.bild[i],
      A_Id: erstellanzeige._id,
    }).save();
    i++;
  }
  return res.status(200).json({
    message: "erfolgreich",
  });
});

// Raute für das Erstellen von Nachrichten
router.route("/nachrichtenerstellen").post(async (req, res) => {
  const ret = await new nachricht({
    datum: new Date().toLocaleDateString(),
    Absender_Id: req.body.Absender_Id,
    Empfaenger_Id: req.body.Empfaenger_Id,
    A_Id: req.body.A_Id,
  }).save();
  return res.status(200).json({
    message: "erfolgreich",
    N_Id: ret._id,
  });
});

// Raute für das Anfragen von Nachrichten
router.route("/nachrichtenAnfrage").post(async (req, res) => {
  /*await new nachricht({
    datum: new Date().toLocaleDateString(),
    Absender_Id: "609c9db5e0ba752cdce9944e",
    Empfaenger_Id: "609f59b0c8ab1625a85f5a65",
    A_Id: "60abdc2f6d61250ee835b520",
  }).save();*/

  const findNachrichten = await nachricht.find({ Absender_Id: req.body.id });
  const array = [];
  var i = 0;
  var z = 0;
  var j = 0;
  while (i < findNachrichten.length) {
    const findAbsender = await benutzer.findOne({
      _id: findNachrichten[i].Absender_Id,
    });
    const findAnzeige = await anzeige.findOne({ _id: findNachrichten[i].A_Id });
    array.push({
      anzeige: findAnzeige,
      absender: findAbsender,
      nachricht: findNachrichten[i],
    });
    i++;
  }

  const findNachrichten2 = await nachricht.find({ Empfaenger_Id: req.body.id });
  /*const findNachrichten2 =[];


  while (z < findNachrichten1.length) {
    if(findNachrichten1[z].type === "other"){
      findNachrichten1[z].type = "";
    }else{
      findNachrichten1[z].type = "other";
    }
    findNachrichten2.push(findNachrichten1[z]);
    z++;
  }
  console.log(findNachrichten2);
*/

  while (j < findNachrichten2.length) {
    const findAbsender = await benutzer.findOne({
      _id: findNachrichten2[j].Absender_Id,
    });
    const findAnzeige = await anzeige.findOne({
      _id: findNachrichten2[j].A_Id,
    });
    array.push({
      anzeige: findAnzeige,
      absender: findAbsender,
      nachricht: findNachrichten2[j],
    });
    j++;
  }
  return res.status(200).json(array);
});

// Raute für das Anfragen von chats
router.route("/chaterstellen").post(async (req, res) => {
  const neue = await new chat({
    datum: new Date().toLocaleDateString(),
    uhrzeit: new Date().toLocaleTimeString(),
    N_Id: req.body.N_Id,
    msg: req.body.msg,
    type: req.body.type,
  }).save();
  return res.status(200).json(neue);
});

// Raute für das Anfragen von chats
router.route("/chatAnfrage").post(async (req, res) => {
  const findChat = await chat.find({ N_Id: req.body.N_Id });
  const findNachricht = await nachricht.findOne({ _id: req.body.N_Id });
  const findAbsender = await benutzer.findOne({
    _id: findNachricht.Absender_Id,
  });
  const findEmpfanger = await benutzer.findOne({
    _id: findNachricht.Empfaenger_Id,
  });

  return res.status(200).json({
    findChat: findChat,
    absendername: findAbsender.benutzername,
    Absender_Id: findNachricht.Absender_Id,
    empfangername: findEmpfanger.benutzername,
    Empfaenger_Id: findNachricht.Empfaenger_Id,
    titel: findNachricht.titel,
  });
});

module.exports = router;
