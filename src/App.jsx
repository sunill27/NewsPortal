import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SingleNews from "./pages/SingleNews";
import Travel from "./pages/Travel";
import Finance from "./pages/Finance";
import Politics from "./pages/Politics";
import Agriculture from "./pages/Agriculture";
import SignIn from "./auth/SignIN";
import SignUp from "./auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news/:_id" element={<SingleNews />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
