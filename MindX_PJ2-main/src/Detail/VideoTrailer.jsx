import React, { useContext } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import ReactPlayer from 'react-player';
import "./Style.css"

export default function VideoTrailer({  isOpen, selectedVideoUrl, handleClosePopup  }) {

  const popupStyle = {
    display: isOpen ? 'flex' : 'none'
  };
  // handle close popup when click on background
  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("trailer-popup")) {
      handleClosePopup();
    }
  };
  return (
    <div className="trailer-popup" style={popupStyle}  onClick={handleBackgroundClick}>
      <div className="trailer-popup-container fullscreen">
        <div className="trailer-popup-content">
          <ImCancelCircle className="close-button" onClick={handleClosePopup} />
          <div className="trailer-here">
            <ReactPlayer
              url={selectedVideoUrl}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}