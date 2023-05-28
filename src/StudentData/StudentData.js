import React, { useState, useEffect } from "react";
import { fetchStd } from "../components/DetailsService";
import qs from "qs";
import "./student.css";
import ChatSection from "../components/chat/ChatSection";

export default function Student(props) {
  const [std, setStd] = useState([]);
  const [name,setName] = useState();
  const fetchNames = async () => {
    const Data = {
      ToName: sessionStorage.getItem("name"),
    };
    await fetchStd(qs.stringify(Data))
      .then((response) => {
        setStd(response.data.body);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if(sessionStorage.getItem("isLoggedIn")){
        setName(sessionStorage.getItem("name"));
    }
    fetchNames();
},[]);
console.log(props.Name);
  const [selectedName, setSelectedName] = useState("");

  const handleEntityClick = (name) => {
    setSelectedName(name);
  };


  return (
    <div>

      <div className="Section2">
        <div className="student1">
        <h1>Chat with Students</h1>
          {std.map((name, index) => (
            <div>
              <div
                className={`stdCard ${name === selectedName ? "selected" : ""}`}
                onClick={() => handleEntityClick(name)}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
        <div className="SectionMsg">
          <ChatSection Name={name} ToName={selectedName} />
        </div>
      </div>
    </div>
  );
}
