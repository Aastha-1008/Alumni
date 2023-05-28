import React, { useState, useEffect } from "react";
import "./ChatSection.css";
import qs from "qs";
import { chat, fetchMsgs } from "../DetailsService";
import { useLocation } from "react-router-dom";

export default function ChatSection(props) {
  const [msgValue, setMsgValue] = useState();
  const [msgChat, setMsgChat] = useState([]);
  const [ToName, setToName] = useState(props.ToName);
  var FromName = props.Name;

  console.log(props.ToName);

  const MsgRead = () => {
    setMsgValue(document.getElementById("enterMsg").value);
  };

  const fetchMsg = async () => {
    const alumniAndStudent = {
      ToName: props.ToName,
      FromName: FromName,
    };
    await fetchMsgs(qs.stringify(alumniAndStudent))
      .then((response) => {
        setMsgChat(response.data.body);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("name changed");
    fetchMsg();
  }, [props.ToName]);

  const SendMsg = async () => {
    const requestBodyArray = {
      FromName: props.Name,
      ToName: props.ToName,
      MsgValue: msgValue,
      FromToMsg: 2,
      SoftDelete: 0,
    };
    await chat(qs.stringify(requestBodyArray))
      .then((response) => {
        console.log(response);
        document.getElementById("enterMsg").value = "";
      })
      .catch((error) => console.log(error));

    fetchMsg();
  };

  var chatHistory = document.getElementById("displayChat");
  if (chatHistory) {
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  return (
    <div className="alumniSec">
      <h1> {FromName}</h1>

      <div className="messageSection" id="displayChat">
        {props.ToName === "" ? (
          "Please Select Student..."
        ) : (
          <div>
            {msgChat.map(({ fromToMsg, message, msgDate }) => (
              <div>
                {fromToMsg === 2 ? (
                  <div className="right">
                    <p>{message}</p>
                    <br />
                  </div>
                ) : (
                  <div className="left">
                    <p>{message}</p>
                    <br />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="messagePart">
        <div className="Msg">
          <input
            type="text"
            name="Msg"
            placeholder="Enter your message here..."
            id="enterMsg"
            onChange={MsgRead}
          />
        </div>
        <div className="sendMsg">
          <button onClick={SendMsg}>SEND</button>
        </div>
      </div>
    </div>
  );
}
