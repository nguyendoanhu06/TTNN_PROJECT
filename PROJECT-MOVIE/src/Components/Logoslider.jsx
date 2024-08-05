import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default function Logoslider() {
  const sliderRef = useRef(null);

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <FaAngleLeft className="iconLeft" />,
    nextArrow: <FaAngleRight className="iconRight" />,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="logo-slider">
      <div className="logo-slider-container">
        <div className="logo-slider-context">
          <div className="logo-slider-wrap">
            <div className="logo-images-slider">
            <div className="customNav">
                <a className="prev" onClick={handlePrev}>
                  <FaAngleLeft className="iconLeft" />
                </a>
                <a className="next" onClick={handleNext}>
                  <FaAngleRight className="iconRight" />
                </a>
              </div>
              <Slider {...settings} ref={sliderRef} className="custom-slick">
                <div className="carousel-logo-item">
                  <div className="logo-item-images">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/partner1.png" />
                  </div>
                </div>
                <div className="carousel-logo-item">
                  <div className="logo-item-images">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/partner2.png"  />
                  </div>
                </div>
                <div className="carousel-logo-item">
                  <div className="logo-item-images">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/partner3.png"/>
                  </div>
                </div>
                <div className="carousel-logo-item">
                  <div className="logo-item-images">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/partner4.png"  />
                  </div>
                </div>
                <div className="carousel-logo-item">
                  <div className="logo-item-images">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/partner5.png"/>
                  </div>
                </div>
              </Slider>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
