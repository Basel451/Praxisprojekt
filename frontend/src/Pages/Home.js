//import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigationen/NaviFuerHome";
import Anzeige from "../components/Anzeige";
import { useMy } from "../MyContext";

export default function Home() {
  //const [index, setIndex] = useState(0);
  //const [anzeigen, setAnzeige] = useState([]);
  //const [fetchMore, setFetchMore] = useState(true);
  const { suchanzeigen } = useMy();
  /*
  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/anzeiges", {
        index: index,
      });
      if (res.data) {
        setAnzeige(res.data.array);
        setIndex(res.data.index);
        if (res.data.index < 10) setFetchMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    call();
  }, []);

  function checkForEvent() {
    console.log(window.pageYOffset);
    if (fetchMore) {
      if (window.pageYOffset > 90) {
        call();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", checkForEvent);

    return () => window.removeEventListener("scroll", checkForEvent);
  });
*/
  if (suchanzeigen.length === 0) {
    return (
      <>
        <Navigation />
        <center>
          <br />
          <h2>Keine Anzeigen vorhanden</h2>
        </center>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="featured-anzeige">
        <Anzeige value={suchanzeigen} />
      </div>
    </>
  );
}
