import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Feature from "./Feature";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import "../styles/landingPage.css";
import PublicNavbar from "./PublicNavbar";

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
