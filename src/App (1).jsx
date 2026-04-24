import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../src/Comapnets/Main/main (1).jsx";
import Des from "./Comapnets/MoreButtenPage/des.jsx";
import Home from "./Comapnets/homepag/home.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/des" element={<Des />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
