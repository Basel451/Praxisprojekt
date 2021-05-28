import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const MyContext = React.createContext();

export function useMy() {
  return useContext(MyContext);
}

function MyContextWrapper({ children }) {
  const [id, setId] = useState(null);
  const [benutzername, setBenutzername] = useState(null);
  const [N_Id, setN_Id] = useState([]);
  const [anzeigen, setAnzeige] = useState([]);
  const [suchanzeigen, setSuchanzeigen] = useState([]);

  async function einloggen(email, passwort) {
    return await axios
      .post("http://localhost:3001/einloggen", {
        email,
        passwort,
      })
      .then( function (res) {
          if (res.data.P_id) {
            setId(res.data.P_id);
            setBenutzername(res.data.benutzername);
          }
          return res.data.message;
        }
      )
      .catch((err) => {
        console.log(JSON.stringify(err));
        return "Hooply, etwas ist schief gelaufen!!";
      });
  }

  async function registrieren(
    name,
    vorname,
    telefonnummer,
    wohnort,
    mail,
    passwort
  ) {
    return await axios
      .post("http://localhost:3001/registrieren", {
        name,
        vorname,
        telefonnummer,
        wohnort,
        mail,
        passwort,
      })
      .then(
        await function (res) {
          return res.data.message;
        }
      );
  }

  async function ausloggen() {
    setId(null);
    setBenutzername(null);
  }

  async function suchen() {
    try {
      const res = await axios.post("http://localhost:3001/anzeiges", {});
      if (res.data) {
        setAnzeige(res.data.array);
        setSuchanzeigen(res.data.array);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*suchen();*/
  useEffect(() => {
    suchen();
  }, []);

  return (
    <MyContext.Provider
      value={{
        N_Id,
        suchanzeigen,
        anzeigen,
        benutzername,
        id,
        einloggen,
        registrieren,
        ausloggen,
        suchen,
        setSuchanzeigen,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextWrapper;
