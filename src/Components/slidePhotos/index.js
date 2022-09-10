import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.css";

export default function SlidePhotos() {
  const fadeImages = [
    {
      url: "https://plummour.com/wp-content/uploads/2021/06/Dior-Banner-1.jpg.webp",
      caption: "First Slide",
    },
    {
      url: "https://www.africansalescompany.co.za/wp-content/uploads/2018/05/Givenchy-Gentlemen-EDP-1250w-500h-pixels.jpg",
      caption: "Second Slide",
    },
    {
      url: "https://plummour.com/wp-content/uploads/2021/06/Burberry-banner-1.jpg.webp",
      caption: "Third Slide",
    },
  ];
  return (
    <div className="slide-container">
      <Fade duration="2000">
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade" key={index}>
            <img src={fadeImage.url} alt="banner" />
          </div>
        ))}
      </Fade>
    </div>
  );
}
