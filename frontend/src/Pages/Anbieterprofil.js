import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/Navigation";
import { VscAccount } from "react-icons/vsc";
import Anzeige from "../components/Anzeige";

export default function Anbieterprofil(props) {
  const [benutzername, setBenutzername] = useState("");
  const [anzeigen, setAnzeigen] = useState([]);
  const [aktiv, setAktiv] = useState(false);
  const P_id = props.match.params.id;

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/anbieterprofil", {
        P_id,
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
  return (
    <>
      <Navigation Ueberschrift={"Profil für " + benutzername} />
      <div className="Anbieterprofil">
        <center className="fuer_Profil">
          <VscAccount className="profil_bild" />
          <h4>{benutzername || "Profil"}</h4>
          <p>Anzahl der Anzeigen: {anzeigen.length}</p>
        </center>
        <hr />
        <div className="featured-anzeige">
          <Anzeige value={anzeigen} />
        </div>
      </div>
    </>
  );
}
