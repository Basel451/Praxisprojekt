import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/Navigation";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useMy } from "../MyContext";

export default function Profil() {
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [mail, setMail] = useState("");
  const [passwort, setPasswort] = useState("*****");
  const [benutzername, setBenutzername] = useState("");
  const [bearbeitet, setBearbeitet] = useState(false);
  const { id } = useMy();

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/profilanfrage", {
        id: id,
      });
      if (res.data) {
        setName(res.data.name);
        setVorname(res.data.vorname);
        setTelefonnummer(res.data.telefonnummer);
        setWohnort(res.data.wohnort);
        setMail(res.data.mail);
        setBenutzername(res.data.benutzername);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    call();
  }, []);

  async function bearbeiten() {
    try {
      const res = await axios.post("http://localhost:3001/profilbearbeiten", {
        id,
        name,
        vorname,
        telefonnummer,
        wohnort,
        mail,
        passwort,
        benutzername,
      });
      if (res.data) {
        setBearbeitet(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // falls keine Id für Benutzer gibt
  if (id == null) {
    return (
      <div className="error">
        <Navigation Ueberschrift="Profil" />
        <div className="banner">
          <h1>nicht eingeloggt</h1>
          <div></div>
          <p>Sie sollen sich einloggen, um weiterzukommen</p>
          <Link to="/Einloggen" className="btn-primary">
            einloggen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation Ueberschrift="Profil" />
      <div className="profil">
        <center className="fuer_Profil">
          <VscAccount className="profil_bild" />
          <h4>{benutzername || "Profil"}</h4>
        </center>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            bearbeiten();
          }}
          className="form-profil"
        >
          <div>
            <span>Name:</span>
            <input
              className="Input"
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Vorname:</span>
            <input
              className="Input"
              type="text"
              value={vorname}
              required
              onChange={(e) => {
                setVorname(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Benutzername:</span>
            <input
              className="Input"
              type="text"
              value={benutzername}
              onChange={(e) => {
                setBenutzername(e.target.value);
              }}
            />
          </div>
          <div>
            <span>E-Mail:</span>
            <input
              className="Input"
              type="text"
              value={mail}
              required
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Passwort:</span>
            <input
              className="Input"
              type="text"
              value={passwort}
              required
              onChange={(e) => {
                setPasswort(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Telefonnummer:</span>
            <input
              className="Input"
              type="text"
              value={telefonnummer}
              onChange={(e) => {
                setTelefonnummer(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Wohnort:</span>
            <input
              className="Input"
              type="text"
              value={wohnort}
              onChange={(e) => {
                setWohnort(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className={
                bearbeitet ? "SubmitButton nachbarbeiten" : "SubmitButton"
              }
              type="submit"
            >
              bearbeiten
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
