import React from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Feature from "./components/Feature";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import "../../styles/landingPage.css";
import PublicNavbar from "./components/PublicNavbar";

function LandingPage() {
  return (
    <>
      <PublicNavbar />
      <Hero />
      <Stats />
      <Feature />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
export default LandingPage;
