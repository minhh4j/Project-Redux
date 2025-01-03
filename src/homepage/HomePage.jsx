import React, { useContext } from "react";
import Nav from "./Nav"
import HeroSection from "./HeroSection";
import Center from "./Center";
import { ProductContext } from "../Context/ProductContext";
import Footer from "./Footer";

function HomePage() {
  const { search } = useContext(ProductContext);
  return (
    <div>
      <Nav />
      {search ? (
        <>
          <Center />
          <HeroSection />
          <Footer />
        </>
      ) : (
        <> 
          <HeroSection />
          <Center />
          <Footer/>
        </>
      )}
    </div>
  );
}

export default HomePage;
