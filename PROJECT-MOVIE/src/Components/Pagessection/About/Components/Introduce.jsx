import React, { useState } from "react";
import "../style/About.css";
import { FaPlay } from "react-icons/fa";
import { PiFilmReelBold, PiFilmSlateFill } from "react-icons/pi";
import Trailer from "../../../Trailer";
import CountUp from "react-countup";

export default function Introduce() {
  const [isPopupOpen, setIsOpen] = useState(false); // popup handle state
  
  
  const handleOpenPopup = () => {
    setIsOpen(true);
  };
  return (
    <div className="introduce-section">
      <div className="introduce-overlay"></div>
      <div className="introduce-container">
        <div className="introduce-left">
          <div className="introduce-left-container">
            <div className="introduce-left-img">
              <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-about-about-page.jpg" />
            </div>
            <div className="introduce-left-smallimg">
              <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-arrow-about-about-page.png" />
            </div>
            <div className="introduce-left-btn " onClick={handleOpenPopup}>
              <div className="introduce-left-video-btn">
                <FaPlay />
              </div>
            </div>
            <div className="introduce-left-textimg">
              <div className="introduce-left-textimg_counter">
                <div className="counter-content">
                  <span> <CountUp
                                  start={0}
                                  end={20}
                                  duration={2}
                                /></span>
                  <p>năm kinh nghiệm</p>
                </div>
              </div>
            </div>
            <div className="introduce-left-overlay">
              <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/background-image-about-about-page.png" />
            </div>
          </div>
        </div>
        <div className="introduce-right">
          <div className="introduce-right-container">
            <div className="introduce-right-header">
              <div className="introduce-right-header_container">
                <div className="introduce-right-header_icon">
                  <PiFilmReelBold />
                </div>
                <div className="introduce-right-top_heading">
                  <h3 className="sub-title">Tìm hiểu thêm</h3>
                  <h2 className="title">Cung cấp dịch vụ làm phim chuyên nghiệp nhất</h2>
                </div>
                <p className="description">
                  Lorem ipsum dolor sit amet consectur adipiscing elit sed
                  eiusmod tempor incididunt labore dolore magna aliquaenim ad
                  minim. Sed risus commodo ornare felis non, eleifend molestie
                  metus pharetra eleifend.{" "}
                </p>
              </div>
            </div>
            <div className="introduce-right-context">
              <div className="introduce-right-more">
                <div className="introduce-right-wrap">
                  <div className="introduce-right-iconbox">
                    <span className="iconbox-container">
                      <PiFilmSlateFill />
                    </span>
                  </div>
                  <div className="introduce-right-text">
                    <h3 className="right-text_title">
                      <span>6 năm cho sự đổi mới </span>
                    </h3>
                    <p className="right-text_desc">
                      Chúng tôi luôn luôn ở bên cạnh bạn từ bắt đầu đến kết thúc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="introduce-right-button">
              <button>Khám phá thêm</button>
            </div>

          </div>
        </div>
      </div>
       {/* Trailer popup */}
       <Trailer
        isOpen={isPopupOpen}
        selectedVideoUrl="https://www.youtube.com/watch?v=XHOmBV4js_E" 
        handleClosePopup={() => setIsOpen(false)} 
      />
    </div>
  );
}
