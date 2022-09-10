import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/cards/cards";
import Footer from "../../Components/footer";
import Header from "../../Components/header";
import SlidePhotos from "../../Components/slidePhotos";
import "./style.css";

export default function Home() {
  const { cart } = useSelector((cart) => ({ ...cart }));

  return (
    <div className="home_wrapper">
      <div className="home">
        <Header numberOfItems={cart} />
        <SlidePhotos />
        <Cards />
      </div>

      <Footer marginTop="20vh" />
    </div>
  );
}
