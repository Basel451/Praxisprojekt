import React from "react";
import Navigation from "../components/Navigationen/Navigation";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div className="error">
      <Navigation Ueberschrift="undefinite Seite" />
      <div className="banner">
        <h1>404</h1>
        <div></div>
        <p>Seite nicht gefunden</p>
        <Link to="/" className="btn-primary">
          Homepage
        </Link>
      </div>
    </div>
  );
}
