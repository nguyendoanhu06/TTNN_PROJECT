import React from "react";
import { NavLink } from "react-router-dom";
import { FaLocationArrow, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <section className="Footer">
      <div className="footer-container">
        <div className="footer-wrap">
          <div className="minifooter">
            <div className="minifooter-container">
              <div className="minifooter-left">
                <div className="minifooter-left-container">
                  <div className="minifooter-left-content">
                    <div className="minifooter-brand">
                      <NavLink to={"#"}>
                        <img
                          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/logo-white.png"
                          alt="Aovis – Film & Movie Booking WordPress Theme"
                        />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="minifooter-right">
                <div className="minifooter-right-container">
                  <div className="minifooter-right-first">
                    <div className="minifooter-right-first-content">
                      <NavLink to={"faqs"}>Cần giúp đỡ ? / </NavLink>
                      <NavLink to={"#"}>Chính sách bảo mật</NavLink>
                    </div>
                  </div>
                  <div className="minifooter-right-second">
                    <div className="minifooter-right-second-content">
                      <div className="minifooter-social-icons">
                        <span className="grid-item">
                          <NavLink to={"#"}>
                            <FaTwitter />
                          </NavLink>
                        </span>
                        <span className="grid-item">
                          <NavLink to={"#"}>
                            <FaFacebook />
                          </NavLink>
                        </span>
                        <span className="grid-item">
                          <NavLink to={"#"}>
                            <FaPinterest />
                          </NavLink>
                        </span>
                        <span className="grid-item">
                          <NavLink to={"#"}>
                            <FaInstagram />
                          </NavLink>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bigfooter">
            <div className="bigfooter-container">
              <div className="bigfooter-col">
                <div className="bigfooter-wrap">
                  <div className="bigfooter1-headtext">
                    <p>Mua vé phim bạn thích dễ dàng với hệ thống của chúng tôi</p>
                  </div>
                  <div className="bigfooter1-btn">
                    <div className="bigfooter1-btn-container">
                      <button>Đặt vé ngay</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bigfooter-col-25">
                <div className="bigfooter-wrap">
                  <div className="bigfooter-25-headtext">
                    <div className="top-heading has-square-corner">
                      <h2 className="title">Thể loại</h2>
                    </div>
                  </div>
                  <div className="bigfooter-25-body">
                    <div className="menu-footer">
                      <ul id="menu-footer-menu-movies" className="menu-bigfooter">
                        <li>
                          <NavLink to={"#"}>Action</NavLink>
                        </li>
                        <li>
                          <NavLink to={"#"}>Adventure</NavLink>
                        </li>
                        <li>
                          <NavLink to={"#"}>Animation</NavLink>
                        </li>
                        <li>
                          <NavLink to={"#"}>Comedy</NavLink>
                        </li>
                        <li>
                          <NavLink to={"#"}>Crime</NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bigfooter-col-25">
                <div className="bigfooter-wrap">
                  <div className="bigfooter-25-headtext">
                    <div className="top-heading has-square-corner">
                      <h2 className="title">Các trang khác</h2>
                    </div>
                  </div>
                  <div className="bigfooter-25-body">
                    <div className="menu-footer">
                      <ul id="menu-footer-menu-links" className="menu-bigfooter">
                        <li>
                          <NavLink to={"/about"}>Về chúng tôi</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/my-account"}>Tài khoản</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/news"}>Tin tức</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/events"}>Sự kiện</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/contact"}>Liên hệ</NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bigfooter-col-25">
                <div className="bigfooter-wrap">
                  <div className="bigfooter-25-headtext">
                    <div className="top-heading has-square-corner">
                      <h2 className="title">Nhận tin</h2>
                    </div>
                  </div>
                  <div className="bigfooter-newsletter-body">
                    <div className="newsletter-body-container">
                     Subcribe để nhận tin tức của chúng tôi mỗi ngày
                    </div>
                  </div>
                  <div className="newsletter-input">
                    <div className="newsletter-container">
                      <form action="">
                        <div className="form-field">
                          <div className="subcribe-form-wrapper">
                            <div className="subcribe-form">
                              <input
                                type="email"
                                name="EMAIL"
                                placeholder="Email Address"
                                required
                              />
                              <button type="submit">
                                <FaLocationArrow />
                              </button>
                            </div>
                            <label>
                              <input
                                name="AGREE_TO_TERMS"
                                type="radio"
                                value="1"
                                required
                              />
                              <NavLink to={"#"}>
                                Tôi đồng ý với điều khoản và chính sách của công ty
                              </NavLink>
                            </label>
                          </div>
                        </div>
                      </form>
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
