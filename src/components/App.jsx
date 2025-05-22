import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import UploadCatalogue from "./Upload";
import "../styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/upload" element={<UploadCatalogue />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
