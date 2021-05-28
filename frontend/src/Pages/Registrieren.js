import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMy } from "../MyContext";
import { motion } from "framer-motion";
import { useHistory } from "react-router";

const backDropVariants = {
  expended: {
    width: "223%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(50deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};
const transitionen = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export default function Registrieren(props) {
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [mail, setMail] = useState("");
  const [passwort, setPasswort] = useState("");
  const { registrieren } = useMy();
  const [isExpended, setExpended] = useState(false);
  const history = useHistory();

  return (
    <div className="einloggen">
      <div className="boxContainer">
        <div className="topContainer">
          <motion.div
            className="backDrop"
            initial={false}
            animate={isExpended ? "expended" : "collapsed"}
            variants={backDropVariants}
            transition={transitionen}
          ></motion.div>
          <div className="headerContainer">
            <h2 className="headerText">Konto</h2>
            <h2 className="headerText">erstellen</h2>
            <br />
            <h5 className="smallText">
              Bitte geben Sie Ihre Daten, um sich zu registrieren. Die mit *
              markierten Felder müssen gefüllt werden!
            </h5>
          </div>
        </div>
        <div className="InnerContainer">
          <div className="BoxContainer2">
            <form
              className="FormContainer"
              onSubmit={async (e) => {
                e.preventDefault();
                const c = await registrieren(
                  name,
                  vorname,
                  telefonnummer,
                  wohnort,
                  mail,
                  passwort
                );
                if (c === "erfolgreich") {
                  history.push("/einloggen");
                }
              }}
            >
              <div className="InnerFormContainer">
                <input
                  className="Input"
                  type="text"
                  name="Name"
                  placeholder="Name *"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="Input"
                  type="text"
                  name="Vorname"
                  placeholder="Vorname *"
                  required
                  onChange={(e) => {
                    setVorname(e.target.value);
                  }}
                />
              </div>
              <input
                className="Input"
                type="text"
                name="telefonnummer"
                placeholder="telefonnummer"
                onChange={(e) => {
                  setTelefonnummer(e.target.value);
                }}
              />
              <input
                className="Input"
                type="text"
                name="Wohnort"
                placeholder="Wohnort"
                onChange={(e) => {
                  setWohnort(e.target.value);
                }}
              />
              <input
                className="Input"
                type="email"
                placeholder="E-Mail *"
                onChange={(e) => {
                  setMail(e.target.value);
                }}
              />
              <input
                className="Input"
                type="password"
                placeholder="Passwort *"
                onChange={(e) => {
                  setPasswort(e.target.value.toLowerCase());
                }}
              />
              <button className="SubmitButton" type="submit">
                Registrieren
              </button>
              <p className="MutedLink">
                Haben Sie einen Acount?
                <Link to="/Einloggen" type="submit" className="BoldLink">
                  Einloggen
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
