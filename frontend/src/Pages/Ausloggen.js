import React from "react";
import { Link } from "react-router-dom";
import { useMy } from "../MyContext";

export default function Ausloggen() {
  const { ausloggen } = useMy();
  ausloggen();
  return (
    <div className="error">
      <div className="banner">
        <h1>ausgeloggt</h1>
        <div></div>
        <p>Klicken Sie auf den Button, um auf die Homepage zu kommen</p>
        <Link to="/" className="btn-primary">
          Homepage
        </Link>
      </div>
    </div>
  );
}
