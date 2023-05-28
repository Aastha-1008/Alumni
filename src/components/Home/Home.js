import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import "./Home.css";
import StudentData from "../../StudentData/StudentData";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, setLoginIn] = useState(false);
  const [alumniDetails, setAlumniDetails] = useState({});
  const buttonRef = useRef();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:8081/api/login/", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        setLoginIn(true);
        setAlumniDetails(response.data.body);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", response.data.body.username);
        sessionStorage.setItem("name", response.data.body.name);

    }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check session storage for login state
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    

    // Redirect to the login page if not logged in
    if (isLoggedIn) {
      // Example: history.push('/login');
      setLoginIn(true);
      setUsername(sessionStorage.getItem("name"));
    }
  }, []);

  const handleUserActivity = () => {

    const divValue = buttonRef.current.textContent;
    console.log(divValue);
    if (divValue === "LogIn") {
      setLoginIn(true);
      buttonRef.current.textContent = "LogOut";
    } else if (divValue === "LogOut") {
      setLoginIn(false);
      buttonRef.current.textContent = "LogIn";
      sessionStorage.clear();
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="portal">
      <div className="alumniNavbar">
        <div className="headingAlumni">Alumni Portal</div>
        <div className="ButtonAlumni">
          <button onClick={handleUserActivity} ref={buttonRef}>
            {logIn ? "LogOut" : "LogIn"}
          </button>
        </div>
      </div>
      {!logIn && (
        <div>
          <div className="form">
            <form onSubmit={handleLogin}>
              <h2>KIET group of Institution</h2>
              <hr />
              <p>UserName :</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <p>Password : </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit" className="logInButton">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      {logIn && <StudentData Name={username} />}
    </div>
  );
}
