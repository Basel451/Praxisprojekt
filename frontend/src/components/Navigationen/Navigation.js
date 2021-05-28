import React, { useState } from "react";
import {
  FiAlignJustify,
  FiChevronDown,
  FiArchive,
  FiLogOut,
  FiSearch,
  FiStar,
  FiMessageSquare,
  FiLogIn,
} from "react-icons/fi";
import { VscAccount, VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useMy } from "../../MyContext";
import logo from "../../logo.svg";

export default function Navigation(props) {
  const [hauptNav, setHauptNav] = useState(false);
  const { benutzername } = useMy();

  return (
    <nav className="navbar">
      <div className="nav-header">
        <button type="button" className="nav-btn nav-center">
          {hauptNav === false && (
            <FiAlignJustify
              className="nav-icon"
              onClick={() => setHauptNav(true)}
            />
          )}
          {hauptNav === true && (
            <VscChromeClose
              className="nav-icon"
              onClick={() => setHauptNav(false)}
            />
          )}
        </button>
        <div className="Navuberschrift">
          <center>{props.Ueberschrift}</center>
        </div>
        <Link to="/" className="logo">
          <img src={logo} alt="Tauschbörse" />
        </Link>
      </div>
      <div
        className={
          hauptNav ? "ShowhauptNavigation hauptNavigation" : "hauptNavigation"
        }
      >
        <center className="fuer_Profil">
          <Link to="/Profil">
            <VscAccount className="profil_bild" />
          </Link>
          <Link to="/Profil">
            <h4>{benutzername || "Profil"}</h4>
          </Link>
        </center>
        <Link to="/" className="link">
          <FiSearch className="i" /> Suche
        </Link>
        <Link to="/MeineNachrichten/" className="link">
          <FiMessageSquare className="i" /> Nachrichten
        </Link>
        <Link to="/Favoritliste" className="link">
          <FiStar className="i" /> Favoritliste
        </Link>
        <Link to="/MeineAnzeigen" className="link">
          <FiArchive className="i" /> Meine Anzeigen
        </Link>
        {benutzername != null && (
          <Link to="/ausloggen" className="link">
            <FiLogOut className="i" /> ausloggen
          </Link>
        )}
        {benutzername == null && (
          <Link to="/einloggen" className="link">
            <FiLogIn className="i" /> einloggen
          </Link>
        )}
      </div>
    </nav>
  );
}
