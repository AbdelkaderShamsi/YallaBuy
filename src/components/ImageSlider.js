import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";


function ImageSlider (){
  const sliderImages = [
  { url: "/media/Black.jfif" },
  { url: "/media/fall_season.jpg" },
  { url: "/media/fashions.jpg", },
];

  const divStyle = {
  display : 'flex',
  alignItems : "center", 
  justifyContent : "center",
  height : "100vh",
  width: "100vw",        
  backgroundSize : '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: "center",
};
  return (
    <div>
      <Fade className="slide-container">
        {sliderImages.map((image , index) => (
          <div key={index}>
            <div style={{...divStyle , backgroundImage :`url(${image.url})`}}>
              
            </div>
          </div>
        ))}
      </Fade>
    </div>
  )
}
export default ImageSlider;
