import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/Navigation";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import keinbild from "../keinBild.png";
import { useMy } from "../MyContext";

export default function Favoritliste(props) {
  const [anzeigen, setAnzeigen] = useState([]);
  const { id } = useMy();
  //const id = "609f59b0c8ab1625a85f5a65";

  async function call() {
    try {
      const res = await axios.post(
        "http://localhost:3001/favoritlisteAnfrage",
        {
          P_id: id,
        }
      );
      if (res.data) {
        setAnzeigen(res.data);
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
      <Navigation Ueberschrift="Ihre Favoritliste" />
      <div className="MeineAnzeigen">
        <div className="featured-anzeige">
          <div className="featured-anzeige-center">
            {anzeigen.map((item, index) => {
              return (
                <article key={`${index}-anzeiges`} className="anzeige">
                  <div className="img-container">
                    <img
                      src={item.bilder[0].bild || keinbild}
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
                    className="btn-primary anzeige-linkf anzeige-link"
                  >
                    ansehen
                  </Link>

                  <button
                    className="btn-primary anzeige-link loeschenf"
                    onClick={async () => {
                      try {
                        const res = await axios.post(
                          "http://localhost:3001/merklisteloeschen",
                          {
                            A_id: item.anzeige._id,
                            id,
                          }
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    FaStar
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
