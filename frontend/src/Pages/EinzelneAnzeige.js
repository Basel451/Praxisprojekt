import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/Navigation";
import keinbild from "../keinBild.png";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiMapPin,
  FiStar,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaStar,
} from "react-icons/fa";
import { useMy } from "../MyContext";
import { useHistory } from "react-router";

export default function Anzeige(props) {
  const [anzeigen, setAnzeige] = useState(null);
  const [Favoriticon, setFavoriticon] = useState(false);
  const { id } = useMy();
  const { N_Id } = useMy();
  //const id = "609f59b0c8ab1625a85f5a65";
  const A_id = props.match.params.id;
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/einzlneAnzeiges", {
        A_id,
      });
      if (res.data) {
        setAnzeige(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    call();
  }, []);

  //falls kein Raum mit einer bestimmten Id gibt
  if (anzeigen == null) {
    return (
      <div className="error">
        <Navigation Ueberschrift="" />
        <div className="banner">
          <h1>Keine Anzeige gefunden</h1>
          <div></div>
          <p>Es gibt kein Anzeige mit dieser Id!</p>
          <Link to="/" className="btn-primary">
            Homepage
          </Link>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrent(current === anzeigen.bilder.length - 1 ? 0 : current + 1);
  };
  const prewSlide = () => {
    setCurrent(current === 0 ? anzeigen.bilder.length - 1 : current - 1);
  };

  return (
    <>
      <Navigation Ueberschrift={anzeigen.titel || "Titel der Anzeige"} />
      <div className="Anzeige-Container">
        <div className="Anzeige-Img-Btn">
          <div className="images-Container">
            <section className="slider">
              <FaArrowAltCircleLeft
                className="left-arrow"
                onClick={prewSlide}
              />
              <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextSlide}
              />
              {anzeigen.bilder.length === 0 ? (
                <img
                  className="images"
                  src={keinbild}
                  width="750px"
                  height="330px"
                  alt="kein Bild vorhanden"
                />
              ) : (
                anzeigen.bilder.map((item, index) => (
                  <div
                    className={index === current ? "slide aktive" : "slide"}
                    key={index}
                  >
                    {index === current && (
                      <img
                        className="images"
                        key={index}
                        src={item.bild}
                        width="750px"
                        height="330px"
                        alt="kein Bild vorhanden"
                      />
                    )}
                  </div>
                ))
              )}
            </section>
          </div>
          <div className="btn-Container">
            <div className="merkliste-Link ">
              {id == null && (
                <Link to="/Einloggen" className="btn-primary btn-width">
                  <FiStar /> Zur Merkliste hinfügen
                </Link>
              )}
              {id != null && !Favoriticon && (
                <button
                  className="btn-primary btn-width"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        "http://localhost:3001/merkliste",
                        {
                          A_id,
                          id,
                        }
                      );
                      if (res.data) {
                        setFavoriticon(true);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  <FiStar /> {"  "} Zur Merkliste hinfügen
                </button>
              )}
              {id != null && Favoriticon && (
                <button
                  className="btn-primary btn-width"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        "http://localhost:3001/merklisteloeschen",
                        {
                          A_id,
                          id,
                        }
                      );
                      if (res.data) {
                        setFavoriticon(false);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  <FaStar /> {"  "} Zur Merkliste hinfügen
                </button>
              )}
            </div>
            {id == null && (
              <Link to="/Einloggen" className="btn-primary paragraf btn-width">
                <FiMessageSquare /> Nachricht schreiben
              </Link>
            )}
            {id != null && (
              <button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      "http://localhost:3001/nachrichtenerstellen",
                      {
                        Absender_Id: id,
                        Empfaenger_Id: anzeigen.P_id,
                        A_Id: A_id,
                      }
                    );

                    if (res.data.message === "erfolgreich") {
                      console.log(res.data.N_Id);

                      N_Id.push(res.data.N_Id);
                      history.push("/MeineNachrichten");
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
                className="btn-primary paragraf btn-width"
              >
                <FiMessageSquare /> Nachricht schreiben
              </button>
            )}

            <div className="Anzeige-info-box paragraf">
              <center>Infos zu Anbieter</center>
              <br />
              <Link to={"/Profil/" + anzeigen.P_id} className="btn-benutzer">
                <h5>
                  <FiUser className="FiUser" /> {anzeigen.benutzername}
                </h5>
              </Link>
              <br />
              <h5>
                Telefonnummer:{" "}
                <span className="telefonN">
                  {anzeigen.telefonnummer || "Kein Telefonnummer vorhanden"}
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div>
          <div className="Anzeige-uberschrift">
            <h4>{anzeigen.titel}</h4>
            <p>
              <FiMapPin /> {anzeigen.abholungsort}
            </p>
            <div className="datum">
              <div>
                Kategorie: {anzeigen.k_bezeichnung} {" -> "}{" "}
                {anzeigen.uk_bezeichnung}
              </div>
              <div>
                <FiCalendar /> {anzeigen.datum}
              </div>
              <div>Anzeigennummer: {anzeigen.id}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="Anzeige-Beschreibung">
            <h4>Beschreibung</h4>
            <hr />
            <p>{anzeigen.beschreibung}</p>
          </div>
        </div>
      </div>
    </>
  );
}
