import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import MyContextWrapper from "./MyContext";

import Home from "./Pages/Home";
import Anzeige from "./Pages/EinzelneAnzeige";
import AnzeigeBearbeiten from "./Pages/AnzeigeBearbeiten";
import AnzeigeErstellen from "./Pages/AnzeigeErstellen";
import Favoritliste from "./Pages/Favoritliste";
import MeineAnzeigen from "./Pages/MeineAnzeigen";
import MeineNachricht from "./Pages/MeineNachricht";
import Nachricht from "./Pages/Nachricht";
import Profil from "./Pages/Profil";
import Anbieterprofil from "./Pages/Anbieterprofil";
import Einloggen from "./Pages/Einloggen";
import Ausloggen from "./Pages/Ausloggen";
import Registrieren from "./Pages/Registrieren";
import Error from "./Pages/Error";

function App() {
  return (
    <MyContextWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profil" component={Profil} />
        <Route exact path="/Profil/:id" component={Anbieterprofil} />
        <Route exact path="/Anzeige/:id" component={Anzeige} />
        <Route
          exact
          path="/Anzeige/bearbeiten/:id"
          component={AnzeigeBearbeiten}
        />
        <Route exact path="/Anzeigen/erstellen" component={AnzeigeErstellen} />
        <Route exact path="/Favoritliste" component={Favoritliste} />
        <Route exact path="/MeineAnzeigen" component={MeineAnzeigen} />
        <Route exact path="/MeineNachrichten" component={MeineNachricht} />
        <Route exact path="/Nachricht" component={Nachricht} />
        <Route exact path="/einloggen" component={Einloggen} />
        <Route exact path="/ausloggen" component={Ausloggen} />
        <Route exact path="/registrieren" component={Registrieren} />
        <Route component={Error} />
      </Switch>
    </MyContextWrapper>
  );
}

export default App;
