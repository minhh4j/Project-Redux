import React, { useContext } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import Center from "./Center";
import { ProductContext } from "../Context/ProductContext";

function HomePage() {
  const { search } = useContext(ProductContext);
  return (
    <div>
      <Nav />
      {search ? (
        <>
          <Center />
          <HeroSection />
        </>
      ) : (
        <> 
          <HeroSection />
          <Center />
        </>
      )}
    </div>
  );
}

export default HomePage;
