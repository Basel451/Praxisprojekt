import React, { useState } from "react";
import { useMy } from "../../MyContext";
import { useHistory } from "react-router";

export default function EinloggenForm({ value }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fehler, setFehler] = useState("");
  const history = useHistory();
  const { einloggen } = useMy();
  return (
    <div className="BoxContainer2">
      <form
        className="FormContainer"
        onSubmit={async (e) => {
          e.preventDefault();
          const c = await einloggen(username, password); // Rückgabe Wert von einloggen
          //Falls okay

          if (c === "erfolgreich") {
            history.push("/");
          } else {
            setFehler(c);
          }
        }}
      >
        <input
          className="Input"
          type="email"
          placeholder="E-Mail oder Benutzername!"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="Input"
          type="password"
          placeholder="Passwort"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="fehlermeldung">{fehler}</label>
        <a href="#" className="MutedLink">
          Passwort vergessen?
        </a>
        <br />
        <button className="SubmitButton" type="submit">
          Einloggen
        </button>

        <p className="MutedLink">
          Haben Sie kein Acount?
          <a href="#" onClick={value} className="BoldLink">
            Registrieren
          </a>
        </p>
      </form>
    </div>
  );
}
