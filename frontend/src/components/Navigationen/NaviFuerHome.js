import React, { useState, useEffect } from "react";
import {
  FiAlignJustify,
  FiArchive,
  FiLogOut,
  FiSearch,
  FiStar,
  FiMessageSquare,
  FiLogIn,
} from "react-icons/fi";
import { BiSliderAlt } from "react-icons/bi";
import { VscAccount, VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { useMy } from "../../MyContext";
import axios from "axios";

export default function NaviFuerHome() {
  const [nav, setNav] = useState(false);
  const [hauptNav, setHauptNav] = useState(false);
  const { benutzername } = useMy();
  const { anzeigen } = useMy();
  const { suchen } = useMy();
  const { setSuchanzeigen } = useMy();
  const [neueAzeigen, setNeueAnzeigen] = useState([]);
  const [suchbagriff, setSuchbagriff] = useState(null);

  const [kategorie, setKategorie] = useState([]);
  const [UK, setUK] = useState([]);
  const [K_bezeichnung, setK_bezeichnung] = useState(null);

  useEffect(() => {
    suchen();
  }, []);

  async function call() {
    const res = await axios.post("http://localhost:3001/kategorieAnfrage", {});
    if (res.data) {
      setKategorie(res.data.kategorie);
      setUK(res.data.unterkategorie);
    }
  }
  useEffect(() => {
    call();
  }, []);
  return (
    <nav className="navbar">
      <div className="nav-header">
        <button type="button" className="nav-btn nav-center">
          {hauptNav === false && (
            <FiAlignJustify
              className="nav-icon"
              onClick={() => {
                setHauptNav(!hauptNav);
                if (nav) {
                  setNav(false);
                }
              }}
            />
          )}
          {hauptNav === true && (
            <VscChromeClose
              className="nav-icon"
              onClick={() => setHauptNav(false)}
            />
          )}
        </button>
        <div className="such-form nav-center">
          <div className="search_wrap-input-filter">
            <input
              type="text"
              className="such-input"
              placeholder="Ich suche nach...."
              onChange={(e) => {
                setSuchbagriff(e.target.value.toLocaleUpperCase());
                if (!e.target.value) {
                  setSuchanzeigen(anzeigen);
                } else {
                  setSuchanzeigen([]);
                }
                let suchbegriff = e.target.value.toLocaleUpperCase();
                for (var i = 0; i < anzeigen.length; i++) {
                  let titel = anzeigen[i].anzeige.titel.toUpperCase();
                  if (titel.search(suchbegriff) !== -1) {
                    neueAzeigen.push(anzeigen[i]);
                  }
                }
                setSuchanzeigen(neueAzeigen);
                setNeueAnzeigen([]);
              }}
            />
            <button
              type="button"
              className="filter-btn"
              onClick={() => {
                setNav(!nav);
                if (hauptNav) {
                  setHauptNav(false);
                }
              }}
            >
              <BiSliderAlt className="filter-icon" />
            </button>
          </div>
          <button
            className="such-btn"
            onClick={() => {
              for (var i = 0; i < anzeigen.length; i++) {
                let titel = anzeigen[i].anzeige.titel.toUpperCase();
                if (titel.search(suchbagriff) !== -1) {
                  neueAzeigen.push(anzeigen[i]);
                }
              }
              setSuchanzeigen(neueAzeigen);
              setNeueAnzeigen([]);
            }}
          >
            <FiSearch className="such-icon" />
          </button>
        </div>
        <Link to="/" className="logo">
          <img src={logo} alt="Tauschbörse" />
        </Link>
      </div>
      <div className={nav ? "show-nav nav-links" : "nav-links"}>
        <center className="nach-ort-suchen">
          <h5>Suchort:</h5>
          <input
            type="text"
            className=" such-input ort-such-input"
            placeholder="Ich suche im Ort...."
            onChange={(e) => {
              setSuchbagriff(e.target.value.toLocaleUpperCase());
              if (!e.target.value) {
                setSuchanzeigen(anzeigen);
              } else {
                setSuchanzeigen([]);
              }
              let suchbegriff = e.target.value.toLocaleUpperCase();
              for (var i = 0; i < anzeigen.length; i++) {
                let abholungsort =
                  anzeigen[i].anzeige.abholungsort.toUpperCase();
                if (abholungsort.search(suchbegriff) !== -1) {
                  neueAzeigen.push(anzeigen[i]);
                }
              }
              setSuchanzeigen(neueAzeigen);
              setNeueAnzeigen([]);
            }}
          />
          <button
            className="btn-primary"
            onClick={() => {
              for (var i = 0; i < anzeigen.length; i++) {
                let abholungsort =
                  anzeigen[i].anzeige.abholungsort.toUpperCase();
                if (abholungsort.search(suchbagriff) !== -1) {
                  neueAzeigen.push(anzeigen[i]);
                }
              }
              setSuchanzeigen(neueAzeigen);
              setNeueAnzeigen([]);
              setNav(!nav);
            }}
          >
            suchen
          </button>
        </center>
        <center className="nach-kategorie-suchen">
          <div>
            <h5>Kategorie:</h5>
            <select
              className="select"
              onChange={async (e) => {
                //setKsuche("k");

                for (var i = 0; i < kategorie.length; i++) {
                  if (kategorie[i].bezeichnung === e.target.value) {
                    setK_bezeichnung(kategorie[i]._id);
                    const k = kategorie[i]._id;
                    UK.map((item, index) => {
                      if (item.k_id === k) {
                        for (var i = 0; i < anzeigen.length; i++) {
                          if (anzeigen[i].anzeige.UK_Id === item._id) {
                            neueAzeigen.push(anzeigen[i]);
                          }
                        }
                      }
                    });
                  }
                }
                setSuchanzeigen(neueAzeigen);
                setNeueAnzeigen([]);
              }}
              required
            >
              <option> {"<Kategorie auswählen> "}</option>
              {kategorie.map((item, index) => {
                return (
                  <option key={`${index}-kategorie`}>{item.bezeichnung}</option>
                );
              })}
            </select>
          </div>
          <div>
            <h5>Untrkategorie:</h5>
            <select
              className="select"
              required
              onChange={async (e) => {
                for (var i = 0; i < UK.length; i++) {
                  if (UK[i].bezeichnung == e.target.value) {
                    for (var j = 0; j < anzeigen.length; j++) {
                      if (anzeigen[j].anzeige.UK_Id === UK[i]._id) {
                        neueAzeigen.push(anzeigen[j]);
                      }
                    }
                  }
                }
                setSuchanzeigen(neueAzeigen);
                setNeueAnzeigen([]);
              }}
            >
              <option> {"<Unterkategorie auswählen> "}</option>
              {UK.map((item, index) => {
                if (item.k_id === K_bezeichnung) {
                  return (
                    <option key={`${index}-kategorie`}>
                      {item.bezeichnung}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              setNav(!nav);
            }}
          >
            suchen
          </button>
        </center>
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
          <FiSearch className="i" /> Suche{" "}
        </Link>
        <Link to="/MeineNachrichten/" className="link">
          <FiMessageSquare className="i" /> Nachrichten{" "}
        </Link>
        <Link to="/Favoritliste" className="link">
          <FiStar className="i" /> Favoritliste{" "}
        </Link>
        <Link to="/MeineAnzeigen" className="link">
          <FiArchive className="i" /> Meine Anzeigen{" "}
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
