import React, { useState } from "react";
import { Link } from "react-router-dom";
import keinbild from "../keinBild.png";
import PropTypes from "prop-types";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function Anzeige(props) {
  return (
    <div className="featured-anzeige-center">
      {props.value.map((item, index) => {
        return (
          <article key={`${index}-anzeiges`} className="anzeige">
            <div className="img-container">
              <img
                src={item.bilder[0].bild || keinbild}
                height="254.9px"
                width="100%"
                alt="kein Bild vorhanden"
              />
              <div className="price-top">
                <h6>{item.bilder.length === 0 ? 1 : item.bilder.length}</h6>
                <p>Bild/Bilder</p>
              </div>
            </div>
            <div className="room-info">
              <div className="A-uberschrift">
                <p>
                  <FiMapPin /> {item.anzeige.abholungsort}
                </p>
                <p>
                  <FiCalendar /> {item.anzeige.datum}
                </p>
              </div>
              <h5>{item.anzeige.titel}</h5>
              <br />
              <p className="beschreibung">
                {item.anzeige.beschreibung.length > 200
                  ? item.anzeige.beschreibung.substring(0, 197) + "..."
                  : item.anzeige.beschreibung}
              </p>
            </div>
            <Link
              to={"/Anzeige/" + item.anzeige._id}
              className="btn-primary anzeige-link"
            >
              zur Anzeige
            </Link>
          </article>
        );
      })}
    </div>
  );
}

Anzeige.prototype = {
  anzeige: PropTypes.shape({
    anzeige: PropTypes.object.isRequired,
  }),
};
