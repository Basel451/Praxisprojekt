import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigationen/Navigation";
import { useMy } from "../MyContext";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";

export default function MeineNachricht(props) {
  const [allChats, setAllchats] = useState([]);
  const [nachricht, setNachricht] = useState([]);
  const [neueN_Id, setneueN_Id] = useState(null);

  const [nachrichts, setNachrichts] = useState([]);
  const [absendername, setAbsendername] = useState("");
  const [absender_id, setAbsender_id] = useState("");
  const [empfangername, setEmpfangername] = useState("");
  const [empfanger_id, setEmpfanger_id] = useState("");
  const [titel, setTitel] = useState("");
  const { id, N_Id } = useMy();
  //const id = "609f59b0c8ab1625a85f5a65";

  async function aufrufen() {
    const res = await axios.post("http://localhost:3001/chatAnfrage", {
      N_Id: neueN_Id,
    });
    if (res.data) {
      setNachrichts(res.data.findChat);
      setTitel(res.data.titel);
      setAbsendername(res.data.absendername);
      setAbsender_id(res.data.Absender_Id);
      setEmpfangername(res.data.empfangername);
      setEmpfanger_id(res.data.Empfaenger_Id);
    }
  }

  async function call() {
    const res = await axios.post("http://localhost:3001/nachrichtenAnfrage", {
      id,
    });
    if (res.data) {
      setAllchats(res.data);
      console.log(res.data);
    }
  }
  useEffect(() => {
    if (N_Id.length !== 0) {
      setneueN_Id(N_Id.pop());
      aufrufen();
      console.log(neueN_Id);   
    }
    call();
  }, []);

  if (id == null) {
    return (
      <div className="error">
        <Navigation Ueberschrift="Meine Anzeigen" />
        <div className="banner">
          <h1>nicht eingeloggt</h1>
          <div></div>
          <p>Sie sollen sich einloggen, um weiterzukommen</p>
          <Link to="/Einloggen" className="btn-primary">
            einloggen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation Ueberschrift="Meine Nachrichten" />
      <div className="main">
        <div className="main_chatbody">
          {/*chatlist */}
          <div className="main__chatlist">
            {/*Header */}
            <div className="chatlist__heading">
              <h2>Chats</h2>
              <button className="btn-nobg">
                <i className="fa fa-ellipsis-h"></i>
              </button>
            </div>
            {/*suchen */}
            <div className="chatList__search">
              <div className="search_wrap">
                <input type="text" placeholder="Search Here" required />
                <button className="search-btn">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            {/*item  */}
            <div className="chatlist__items">
              {allChats.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      style={{
                        animationDelay: `0.${index + 1}s`,
                      }}
                      className={`chatlist__item`}
                      onClick={async (e) => {
                        for (
                          let index = 0;
                          index < e.currentTarget.parentNode.children.length;
                          index++
                        ) {
                          e.currentTarget.parentNode.children[
                            index
                          ].classList.remove("active");
                        }
                        e.currentTarget.classList.add("active");
                        //setAbsendername(item.absender.benutzername);
                        //setTitel(item.anzeige.titel);
                        setneueN_Id(item.nachricht._id);
                        aufrufen();
                      }}
                    >
                      <div className="avatar">
                        <div className="avatar-img">
                          <img
                            src="http://placehold.it/80x80"
                            width="50px"
                            height="50px"
                            alt="#"
                          />
                        </div>
                      </div>
                      <div className="anzeigetitel">
                        <div className="userMeta">
                          <p>{item.absender.benutzername}</p>
                          <span className="activeTime">
                            {item.nachricht.datum}
                          </span>
                        </div>
                        <h5>{item.anzeige.titel}</h5>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/*chatContent  */}
          <Chat
            N_Id={neueN_Id}
            nachrichts={nachrichts}
            absendername={absendername}
            absender_id={absender_id}
            empfangername={empfangername}
            empfanger_id={empfanger_id}
            titel={titel}
          />
        </div>
      </div>
    </>
  );
}
