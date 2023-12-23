import "./App.css";
import bananLogo from "./assets/bananazon.png";
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <img id="logo-image" src={bananLogo} />
        <h1>HELLO WORLD!</h1>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
