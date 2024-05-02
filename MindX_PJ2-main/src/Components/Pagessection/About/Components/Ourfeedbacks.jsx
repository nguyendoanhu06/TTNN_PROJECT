import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { PiFilmReelBold } from "react-icons/pi";
import Slider from "react-slick";
import { PiChatsCircleBold } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";

export default function Ourfeedbacks() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <section className="fb-about">
      <div className="fb-about-bg"></div>
      <div className="fb-about-container">
        <div className="fb-about-left">
          <div className="fb-about-left-container">
            <div className="fb-about-left-header">
              <div className="icon">
                <PiFilmReelBold />
              </div>
              <div className="top-heading">
                <h3 className="sub-title">Phản hồi</h3>
                <h2 className="title">Khách hàng nói gì về chúng tôi ?</h2>
              </div>
            </div>
            <div className="fb-about-left-body">
            <div className="fb-about-left-slider">
                <div className="fb-about-slider-outer">
                <Slider {...settings}>
                  <div className="fb-slider-item" style={{ width: "481.594px" }}>
                    <div className="item">
                        <div className="quote">
                        <PiChatsCircleBold />
                        </div>

                        <div className="author sidepage">
                            <div className="wrap-image imgside">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="info-sidefb">
                                <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />

                                </div>
                                <h3 className="name">Hubert J. Jonso</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          
                        </div>
                        <p className="content contentside">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                       
                    </div>
                  </div>
                  <div className="fb-slider-item" style={{ width: "573.906px" }}>
                  <div className="item">
                        <div className="quote">
                        <PiChatsCircleBold />
                        </div>

                        <div className="author sidepage">
                            <div className="wrap-image imgside">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-3-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="info-sidefb">
                                <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />

                                </div>
                                <h3 className="name">Mike Hardson</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          
                        </div>
                        <p className="content contentside">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                       
                    </div>
                  </div>
                  <div className="fb-slider-item" style={{ width: "573.906px" }}>
                  <div className="item">
                        <div className="quote">
                        <PiChatsCircleBold />
                        </div>

                        <div className="author sidepage">
                            <div className="wrap-image imgside">
                              <img
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-2-our-team.jpg"
                                alt=""
                              />
                            </div>
                            <div className="info-sidefb">
                                <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />

                                </div>
                                <h3 className="name">Pacific D. Lee</h3>
                                <p className="job">Khách hàng</p>
                            </div>
                          
                        </div>
                        <p className="content contentside">
                          Proin a lacus arcu nullam id dui eu orci maximus. Cras
                          at auctor lectus, vel pretium tellus. Class aptent
                          sociosqu ad litora torquent per conubia nostra.
                        </p>
                       
                    </div>
                  </div>
                  
                  
                </Slider>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div className="fb-about-right">
            <div className="fb-about-right-wrap">
                <div className="fb-about-right-container">
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-testimonial-home-2.png"  />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
