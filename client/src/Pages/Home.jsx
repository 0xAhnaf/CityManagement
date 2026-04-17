import React from "react";
import Navbar from "../NavBar/Navbar";
import Hero from "../Hero/Hero";
import HomeDashboard from "../HomeDashboard/HomeDashboard";
import Footer from "../Footer/Footer";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function Home(){
  return(
    <div>
      <Navbar/>
      <Hero/>
      <HomeDashboard/>
      <Footer/>
    </div>
  );
}

export default Home;