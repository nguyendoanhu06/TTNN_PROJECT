import React from "react";
import "../styles/Ourfeedback.css";
import { PiFilmReelBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { FaQuoteRight } from "react-icons/fa";

export default function Ourfeedback() {
    const settings = {
        dots: false,
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className="ourfb-section">
      <div className="ourfb-bg-overlay"></div>
      <div className="ourfb-container">
        <div className="ourfb-left">
          <div className="ourfb-left-container">
            <div className="ourfb-left-header">
              <div className="ourfb-left-header-container">
                <div className="ourfb-icon">
                  <PiFilmReelBold className="fb-icon-film" />
                </div>
                <div className="ourfb-top-heading">
                  <h3 className="sub-title">Đánh giá</h3>
                  <h2 className="title">Khách hàng nói gì về chúng tôi ?</h2>
                </div>
                <p className="description">
                  Proin a lacus arcu. Nullam id dui eu orci maximus. Cras at
                  auctor lectus, pretium tellus.
                </p>
              </div>
              <div className="ourfb-left-button">
                <div className="fb-left-button-container">
                  {/* <NavLink to={"/#"}>
                    <span className="fb-left-button-content">
                      <span className="fb-left-button-text">
                        View All Feedbacks
                      </span>
                    </span>
                  </NavLink> */}
                  <button className="fb-left-button-content">Xem tất cả đánh giá</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ourfb-right">
          <div className="ourfb-right-container">
            <div className="ourfb-right-context">
              <div className="slider-container">
                <Slider {...settings}>
                  <div className="fb-slider-item" style={{ width: "573.906px" }}>
                    <div className="item">
                      <div className="wrap-content">
                        <p className="content">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                        <div className="author">
                          <div className="wrap-image-info">
                            <div className="wrap-image">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="wrap-info">
                                <h3 className="name">Hubert J. Jonso</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          </div>
                          <div className="quote">
                          <FaQuoteRight className="quote-icon"/>

                          </div>
                          <div className="author-background"></div>
                        </div>
                      </div>
                      <div className="triangle1"></div>
                      <div className="triangle2"></div>
                    </div>
                  </div>
                  <div className="fb-slider-item" style={{ width: "573.906px" }}>
                    <div className="item">
                      <div className="wrap-content">
                        <p className="content">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                        <div className="author">
                          <div className="wrap-image-info">
                            <div className="wrap-image">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-3-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="wrap-info">
                                <h3 className="name">Mike Hardson</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          </div>
                          <div className="quote">
                          <FaQuoteRight className="quote-icon"/>

                          </div>
                          <div className="author-background"></div>
                        </div>
                      </div>
                      <div className="triangle1"></div>
                      <div className="triangle2"></div>
                    </div>
                  </div>
                  <div className="fb-slider-item" style={{ width: "573.906px" }}>
                    <div className="item">
                      <div className="wrap-content">
                        <p className="content">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                        <div className="author">
                          <div className="wrap-image-info">
                            <div className="wrap-image">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-2-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="wrap-info">
                                <h3 className="name">Pacific D. Lee</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          </div>
                          <div className="quote">
                          <FaQuoteRight className="quote-icon"/>

                          </div>
                          <div className="author-background"></div>
                        </div>
                      </div>
                      <div className="triangle1"></div>
                      <div className="triangle2"></div>
                    </div>
                  </div>
                  
                  
                </Slider>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
