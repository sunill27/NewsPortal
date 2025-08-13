import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./auth/SignIN";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleNews from "./pages/SingleNews";
import Politics from "./pages/Politics";
import Administration from "./pages/Administration";
import Finance from "./pages/Finance";
import Agriculture from "./pages/Agriculture";
import Stocks from "./pages/Stocks";
import Technology from "./pages/Technology";
import Corporate from "./pages/Corporate";
import Sports from "./pages/Sports";
import Weather from "./pages/Weather";
import Infrastructure from "./pages/Infrastrucutre";

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
        <Route path="/finance" element={<Finance />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
