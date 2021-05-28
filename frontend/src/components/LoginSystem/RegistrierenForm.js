import React, { useState } from "react";
import { useMy } from "../../MyContext";

export default function RegistrierenForm({ value }) {
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [wohnort, setWohnort] = useState("");
  const [mail, setMail] = useState("");
  const [passwort, setPasswort] = useState("");
  const { registrieren } = useMy();
  return (
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
            value();
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
          <a href="#" onClick={value} className="BoldLink">
            Einloggen
          </a>
        </p>
      </form>
    </div>
  );
}
