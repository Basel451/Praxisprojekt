import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/Navigation";
import { VscAccount, VscTag } from "react-icons/vsc";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import keinbild from "../keinBild.png";
import { useMy } from "../MyContext";

export default function MeineAnzeigen(props) {
  const [benutzername, setBenutzername] = useState(null);
  const [anzeigen, setAnzeigen] = useState([]);
  const { id } = useMy();

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/anbieterprofil", {
        P_id: id,
      });
      if (res.data) {
        setBenutzername(res.data.benutzername);
        setAnzeigen(res.data.anzeigen);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    call();
  }, []);

  if (id == null) {
    return (
      <div className="error">
        <Navigation Ueberschrift="Meine Anzeigen" />
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
      <Navigation Ueberschrift="Meine Anzeigen" />
      <div className="MeineAnzeigen">
        <center className="fuer_Profil">
          <VscAccount className="profil_bild" />
          <h4>{benutzername || "Profil"}</h4>
          <div className="btn-erstellen">
            <div>Anzahl der Anzeigen: {anzeigen.length}</div>
            <Link to="/Anzeigen/erstellen" className="btn-primary">
              <VscTag className="neueAnzeige" /> Anzeige erstellen
            </Link>
          </div>
        </center>
        <hr />
        <div className="featured-anzeige">
          <div className="featured-anzeige-center">
            {anzeigen.map((item, index) => {
              return (
                <article key={`${index}-anzeiges`} className="anzeige">
                  <div className="img-container">
                    <img
                      src={item.bilder[0].bild || keinbild /**/}
                      height="254.9px"
                      width="100%"
                      alt="kein Bild vorhanden"
                    />
                    <div className="price-top">
                      <h6>
                        {item.bilder.length === 0 ? 1 : item.bilder.length}
                      </h6>
                      <p>Bild/Bilder</p>
                    </div>
                  </div>
                  <div className="room-info">
                    <div className="A-uberschrift">
                      <p>
                        <FiMapPin /> {item.anzeige.abholungsort}
                      </p>
                      <p>
                        <FiCalendar /> {item.anzeige.datum}
                      </p>
                    </div>
                    <h5>{item.anzeige.titel}</h5>
                    <br />
                    <p className="beschreibung">{item.anzeige.beschreibung}</p>
                  </div>
                  <Link
                    to={"/Anzeige/" + item.anzeige._id}
                    className="btn-primary anzeige-link"
                  >
                    ansehen
                  </Link>
                  <Link
                    to={"/Anzeige/bearbeiten/" + item.anzeige._id}
                    className="btn-primary anzeige-link bearbeiten"
                  >
                    bearbeiten
                  </Link>
                  <button
                    onClick={async () => {
                      await axios.post(
                        "http://localhost:3001/anzeigeloeschen",
                        { A_id: item.anzeige._id }
                      );
                    }}
                    className="btn-primary anzeige-link loeschen"
                  >
                    löschen
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
