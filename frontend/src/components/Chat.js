import React, { Component, useState, createRef, useEffect } from "react";
import axios from "axios";
import { useMy } from "../MyContext";

export default function Chat(props) {
  const messagesEndRef = createRef();
  const [msg, setMsg] = useState("");
  const { id } = useMy();
  /*
  const [allChats, setAllchats] = useState([]);
  const [absendername, setAbsendername] = useState("");
  const [absender_id, setAbsender_id] = useState("");
  const [empfangername, setEmpfangername] = useState("");
  const [empfanger_id, setEmpfanger_id] = useState("");
  const [titel, setTitel] = useState("");

  console.log(props.N_Id);

  async function call() {
    try {
      const res = await axios.post("http://localhost:3001/chatAnfrage", {
        N_Id: props.N_Id,
      });
      if (res.data) {
        setAllchats(res.data.findChat);
        setTitel(res.data.titel);
        setAbsendername(res.data.absendername);
        setAbsender_id(res.data.Absender_Id);
        setEmpfangername(res.data.empfangername);
        setEmpfanger_id(res.data.Empfaenger_Id);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    call();
  }, []);


  */
  const scrollToBottom = () => {
    console.log(messagesEndRef);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  if (props.N_Id == 1) {
    return <div className="error"></div>;
  }

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
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
            {id === props.absender_id && <p>{props.empfangername}</p>}
            {id === props.empfanger_id && <p>{props.absendername}</p>}
            <div className="chatuberschrift">
              <h5>{props.titel}</h5>
            </div>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="content__body">
        <div className="chat__items">
          {props.nachrichts.map((item, index) => {
            return (
              <div
                style={{ animationDelay: `0.8s` }}
                className={`chat__item ${item.type === id ? "" : "other"}`}
                key={index}
              >
                <div className="chat__item__content">
                  <div className="chat__msg">{item.msg}</div>
                  <div className="chat__meta">
                    <span>{item.datum}</span>
                    <span>{item.uhrzeit}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Schreiben Sie hier Ihre Nachricht"
            onChange={onStateChange}
            value={msg}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={async (e) => {
              if (msg != "") {
                const res = await axios.post(
                  "http://localhost:3001/chaterstellen",
                  {
                    N_Id: props.N_Id,
                    msg: msg,
                    type: id,
                  }
                );
                if (res.data) {
                  props.nachrichts.push(res.data);
                  scrollToBottom();
                  setMsg("");
                }
              }
            }}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
