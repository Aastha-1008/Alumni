import "./App.css";
import AlumniChat from "./components/AlumniChat/AlumniChat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './components/chat/ChatSection';
import Student from "./StudentData/StudentData";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/Chat" element = {<Chat/>}/>
          <Route exact path = "students" element = {<Student/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
