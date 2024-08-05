import React, { useState } from "react";
import "../styles/Bigbanner.css";
import { PiFilmReelBold } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import Trailer from "./Trailer";
export default function Bigbanner() {
  const [isPopupOpen, setIsOpen] = useState(false); // popup handle state
  
  
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  return (
    <div className="bigbanner">
      <div className="bigbanner-overlay"></div>
      <div className="bigbanner-content">
        <div className="bigbanner-left">
          <div className="bigbanner-left-content">
            <div className="bigbanner-left-header-container">
              <div className="bigbanner-left-header-context">
                <div className="bigbanner-header-icon">
                  <PiFilmReelBold className="bigbanner-filmicon" />
                </div>
                <div className="bigbanner-top-heading">
                  <h3 className="bigbanner-subtitle">Phim tài liệu</h3>
                  <p className="bigbanner-title">Cuộc sống khi nhìn qua một chiếc dù</p>
                </div>
                <p className="description">
                  Phasellus non cursus ligula, sed mattis urna. Aenean ac tor
                  gravida, volutpat quam eget, consequat elit.
                </p>
              </div>
            </div>
            <div className="bigbanner-left-icon1">
              <div className="bigbanner-left-icon1-container">
                <img
                  src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/awards-banner-01.png"
                  alt=""
                />
              </div>
            </div>
            <div className="bigbanner-left-icon2">
              <div className="bigbanner-left-icon2-container">
                <img
                  src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/awards-banner-02.png"
                  alt=""
                />
              </div>
            </div>
            <div className="bigbanner-left-button">
                <div className="bigbanner-left-button-container">
                    <div className="bigbanner-left-button-wrapper">
              <a href="" className="moreinfo-button">
                <span className="moreinfo-button-wrapper">
                  <span className="moreinfo-button-text">Chi tiết</span>
                </span>
              </a>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="bigbanner-right">
          <div className="bigbanner-right-content">
            <div className="bigbanner-right-context">
              <div className="bigbanner-right-container">
                <div className="video-text">
                  <div className="text">Xem trailer</div>
                  <div className="icon-content-view" onClick={handleOpenPopup}>
                    <div className="content-video-btn">
                      <FaPlay className="content-video-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bigbanner-right-img">
              <div className="bigbanner-right-img-container">
                <img
                  src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-arrow-video.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trailer
        isOpen={isPopupOpen}
        selectedVideoUrl="https://www.youtube.com/watch?v=XHOmBV4js_E" 
        handleClosePopup={() => setIsOpen(false)} 
      />
    </div>
  );
}
