import React, { useState } from "react";
import EinloggenForm from "../components/LoginSystem/EinloggenForm";
import RegistrierenForm from "../components/LoginSystem/RegistrierenForm";
import { motion } from "framer-motion";

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

export default function Einloggen(props) {
  const [isExpended, setExpended] = useState(false);
  const [aktiv, setAktiv] = useState("Einloggen");

  const handleToggle = () => {
    setExpended(true);
    setTimeout(() => {
      setExpended(false);
    }, transitionen.duration * 1000 - 1500);
  };

  const switchToRegistrieren = () => {
    handleToggle();
    setTimeout(() => {
      setAktiv("Registrieren");
    }, 400);
  };
  const switchToEinloggen = () => {
    handleToggle();
    setTimeout(() => {
      setAktiv("Einloggen");
    }, 400);
  };

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
            {aktiv === "Einloggen" && (
              <div className="headerContainer">
                <h2 className="headerText">Willkommen</h2>
                <h2 className="headerText">zurück</h2>
                <br />
                <h5 className="smallText">
                  Bitte melden Sie sich mit Ihrer E-Mailadresse / Ihrem
                  Benutzernamen und Ihrem Passwort!
                </h5>
              </div>
            )}
            {aktiv === "Registrieren" && (
              <div className="headerContainer">
                <h2 className="headerText">Konto</h2>
                <h2 className="headerText">erstellen</h2>
                <br />
                <h5 className="smallText">
                  Bitte geben Sie Ihre Daten, um sich zu registrieren. Die mit *
                  markierten Felder müssen gefüllt werden!
                </h5>
              </div>
            )}
          </div>
          <div className="InnerContainer">
            {aktiv === "Einloggen" && (
              <EinloggenForm value={switchToRegistrieren} />
            )}
            {aktiv === "Registrieren" && (
              <RegistrierenForm value={switchToEinloggen} />
            )}
          </div>
        </div>
      </div>
  );
}
