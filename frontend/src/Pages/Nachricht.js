import React from "react";
import Navigation from "../components/Navigationen/Navigation";
export default function Nachricht() {
  return (
    <>
      <Navigation Ueberschrift="Nachricht" />
      <div className="main">
        <div className="main_ChatBody">hello from Nachricht page</div>
      </div>
    </>
  );
}
