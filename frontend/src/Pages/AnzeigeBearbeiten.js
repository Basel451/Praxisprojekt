import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigationen/Navigation";
import { Convert } from "mongo-image-converter";
import { useMy } from "../MyContext";
import { useHistory } from "react-router";
import keinbild from "../keinBild.png";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AnzeigeBearbeiten(props) {
  const [titel, setTitel] = useState(null);
  const [beschreibung, setBeschreibung] = useState("");
  const [abholungsort, setAbholungsort] = useState("");
  const [uk_bezeichnung, setUk_bezeichnung] = useState("");
  const [k_bezeichnungen, setK_bezeichnungen] = useState("");
  const [ukId, setUkId] = useState("");
  const [K_bezeichnung, setK_bezeichnung] = useState(null);
  const [kategorie, setKategorie] = useState([]);
  const [UK_Id, setUK_Id] = useState([]);
  const { id } = useMy();
  //const id = "609f59b0c8ab1625a85f5a65";
  const [image, setImage] = useState([]); // Image an datenbank => String
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const A_id = props.match.params.id;

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/einzlneAnzeiges", {
        A_id,
      });
      if (res.data) {
        setUkId(res.data.uk_id);
        setTitel(res.data.titel);
        setBeschreibung(res.data.beschreibung);
        setAbholungsort(res.data.abholungsort);
        setUk_bezeichnung(res.data.uk_bezeichnung);
        setK_bezeichnungen(res.data.k_bezeichnung);
        setK_bezeichnung(res.data.k_id);
        if (res.data.bilder.length === 0) image.push(keinbild);
        for (var i = 0; i < res.data.bilder.length; i++) {
          image.push(res.data.bilder[i].bild);
        }
      }
    } catch (err) {
      console.log(err);
    }
    const res = await axios.post("http://localhost:3001/kategorieAnfrage", {});
    if (res.data) {
      setKategorie(res.data.kategorie);
      setUK_Id(res.data.unterkategorie);
    }
  }
  useEffect(() => {
    call();
  }, []);

  const nextSlide = () => {
    setCurrent(current === image.length - 1 ? 0 : current + 1);
  };
  const prewSlide = () => {
    setCurrent(current === 0 ? image.length - 1 : current - 1);
  };

  //falls kein Raum mit einer bestimmten Id gibt
  if (titel === null) {
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
  // falls der nutzer nicht eingeloggt ist und versucht eine Anzeige zu bearbeiten
  if (id == null) {
    return (
      <div className="error">
        <Navigation Ueberschrift="" />
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
      <Navigation Ueberschrift="Anteige bearbeiten" />
      <div className="Anzeige-erstellen">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await axios.post(
                "http://localhost:3001/anzeigespeichern",
                {
                  A_id: A_id,
                  titel: titel,
                  beschreibung: beschreibung,
                  abholungsort: abholungsort,
                  UK_Id: ukId,
                  bild: image,
                }
              );
              if (res.data.message === "erfolgreich") {
                history.push("/Anzeige/" + A_id);
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <div className="Anzeige-erstellen-header">
            <h5>Anzeigendetails</h5>
            <p>Pflichtfelder sind mit Sternchen * gekennzeichnet!</p>
          </div>
          <hr />
          <div className="Anzeige-erstellen-header">
            <span>Titel der Anzeige *:</span>
            <input
              type="text"
              className="Titel Input"
              onChange={(e) => setTitel(e.target.value)}
              required
              value={titel}
              placeholder="Geben Sie bitte die Titel Ihrer Anzeige ein!"
            />
          </div>
          <div className="Anzeige-erstellen-header">
            <span>Beschreibung :</span>
            <input
              type="text"
              className="Beschreibung Input"
              onChange={(e) => setBeschreibung(e.target.value)}
              required
              value={beschreibung}
              placeholder="Geben Sie bitte die Beschreibung Ihrer Anzeige ein!"
            />
          </div>
          <br />
          <div className="Anzeige-erstellen-header">
            <h5>Kategorisierung</h5>
          </div>
          <hr />
          <div className="Anzeige-erstellen-header">
            <span>Kategorie *:</span>
            <select
              type="submit"
              className="select"
              onChange={async (e) => {
                setK_bezeichnungen(e.target.value);
                for (var i = 0; i < kategorie.length; i++) {
                  if (kategorie[i].bezeichnung == e.target.value) {
                    setK_bezeichnung(kategorie[i]._id);
                  }
                }
              }}
              required
              value={k_bezeichnungen}
            >
              <option> {"<Kategorie auswählen> "}</option>
              {kategorie.map((item, index) => {
                return (
                  <option key={`${index}-kategorie`}>{item.bezeichnung}</option>
                );
              })}
            </select>
          </div>
          <div className="Anzeige-erstellen-header">
            <span>Unterkategorie *:</span>
            <select
              type="submit"
              className="select"
              required
              onChange={async (e) => {
                for (var i = 0; i < UK_Id.length; i++) {
                  if (UK_Id[i].bezeichnung == e.target.value) {
                    setUkId(UK_Id[i]._id);
                  }
                }
              }}
              value={uk_bezeichnung}
            >
              <option> {"<Unterkategorie auswählen> "}</option>
              {UK_Id.map((item, index) => {
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
          <div className="Anzeige-erstellen-header">
            <span>Abholungsort *:</span>
            <input
              type="text"
              className="Input"
              onChange={(e) => setAbholungsort(e.target.value)}
              required
              value={abholungsort}
              placeholder="Geben Sie bitte en Abholungsort ein!"
            />
          </div>
          <br />
          <div className="Anzeige-erstellen-header">
            <h5>Bilder</h5>
          </div>
          <hr />
          <div className="Anzeige-erstellen-bilder">
            <span>Bilder :</span>
            <div className="bild-speichern">
              <input
                type="file"
                id="Anzeige-erstellen-bilder-input"
                multiple={true}
                onChange={async (e) => {
                  //await setImageFile(e.target.files[0]);
                  for (var i = 0; i < e.target.files.length; i++) {
                    try {
                      const convertedImage = await Convert(e.target.files[i]);
                      if (convertedImage) {
                        image[i] = convertedImage;
                        //setImage(convertedImage);
                        // console.log(JSON.stringify(convertedImage));
                        // after this pass it to the backend using your fav API,
                      } else {
                        console.log(
                          "The file is not in format of image/jpeg or image/png"
                        );
                      }
                    } catch (error) {
                      console.warn(error.message);
                    }
                  }
                }}
              />
            </div>
            <div className="images-Container anzeigeerstellen">
              <section className="slider">
                <FaArrowAltCircleLeft
                  className="left-arrow"
                  onClick={prewSlide}
                />
                <FaArrowAltCircleRight
                  className="right-arrow"
                  onClick={nextSlide}
                />
                {image.map((item, index) => (
                  <div
                    className={index === current ? "slide aktive" : "slide"}
                    key={index}
                  >
                    {index === current && (
                      <img
                        className="images"
                        key={index}
                        src={item}
                        height=" 250px"
                        width="590px"
                        alt="kein Bild vorhanden"
                      />
                    )}
                  </div>
                ))}
              </section>
            </div>
          </div>
          <hr />
          <button className="SubmitButton" type="submit">
            Bearbeitung speichern
          </button>
        </form>
      </div>
    </>
  );
}
