import React from "react";
import { PiFilmReelBold } from "react-icons/pi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Filmcrew() {
  return (
    <section className="filmcrew">
      <div className="filmcrew-overlay"></div>
      <div className="filmcrew-container">
        <div className="filmcrew-content">
          <div className="filmcrew-wrap">
            <div className="filmcrew-header">
              <div className="filmcrew-header_container">
                <div className="icon">
                  <PiFilmReelBold />
                </div>
                <div className="top-heading">
                  <h3 className="sub-title">Đội ngũ</h3>
                  <h2 className="title">Đội ngũ làm phim chuyên nghiệp</h2>
                </div>
              </div>
            </div>
            <div className="filmcrew-body">
              <div className="filmcrew-body-container">
                <div className="filmcrew-body-item-container">
                  <div className="filmcrew-item">
                    <div className="our-team">
                      <div className="ourteam-image">
                        <div className="ourteam-image-bg"></div>
                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-1-our-team.jpg" />
                      </div>
                      <div className="ourteam-info">
                        <div className="name-job">
                          <h3 className="name">Kevin Martin</h3>
                          <p className="job">Đạo diễn</p>
                        </div>
                        <div className="socials">
                          <span>
                            <a href="#">
                              <FaTwitter />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaFacebook />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaInstagram />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filmcrew-body-item-container">
                  <div className="filmcrew-item">
                    <div className="our-team">
                      <div className="ourteam-image">
                        <div className="ourteam-image-bg"></div>
                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-2-our-team.jpg" />
                      </div>
                      <div className="ourteam-info">
                        <div className="name-job">
                          <h3 className="name">Jessica Brown</h3>
                          <p className="job">Đạo diễn</p>
                        </div>
                        <div className="socials">
                          <span>
                            <a href="#">
                              <FaTwitter />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaFacebook />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaInstagram />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filmcrew-body-item-container">
                  <div className="filmcrew-item">
                    <div className="our-team">
                      <div className="ourteam-image">
                        <div className="ourteam-image-bg"></div>
                        <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-3-our-team.jpg" />
                      </div>
                      <div className="ourteam-info">
                        <div className="name-job">
                          <h3 className="name">Mike Hardson</h3>
                          <p className="job">Đạo diễn</p>
                        </div>
                        <div className="socials">
                          <span>
                            <a href="#">
                              <FaTwitter />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaFacebook />
                            </a>
                          </span>
                          <span>
                            <a href="#">
                              <FaInstagram />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
