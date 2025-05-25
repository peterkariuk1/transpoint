import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "../pages/Home";
import UploadCatalogue from "./Upload";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Property from "../pages/Property";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/upload" element={<UploadCatalogue />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/property" element={<Property />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
