import React, { useState } from "react";
import "../styles/Moviesplaying.css";
import { PiFilmReel,} from "react-icons/pi";
import { GiCarnivalMask, GiOldMicrophone, GiTargetPrize } from "react-icons/gi";

import Nowplaying from "./Nowplaying";


export default function Moviesplaying() {
  const [activeDot, setActiveDot] = useState(0);

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  return (
    <div className="movies-playing">
        <div className="background-overlay">

        </div>
    <div className="featured-banner">
      <div className="featured-item">
        <div className="featured-content">
          <div
            className="background"
            style={{
              backgroundImage:
                "url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/bg-film-01.png)",
            }}
          ></div>
          <div className="text-content">
            <p className="subtitle">Tham gia ngay</p>
            <h3 className="title">Sự kiện phim sắp diễn ra</h3>
            
          </div>
          <span className="featured-icon">
              <GiCarnivalMask className="flaticon" />
            </span>
        </div>
      </div>
      <div className="featured-item">
        <div className="featured-content">
          <div
            className="background"
            style={{
              backgroundImage:
                "url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/bg-film-01.png)",
            }}
          ></div>
          <div className="text-content">
            <p className="subtitle">Xem ngay</p>
            <h3 className="title">Xem lễ trao giải phim</h3>
           
          </div>
          <span className="featured-icon">
              <GiTargetPrize className="flaticon" />
            </span>
        </div>
      </div>
      <div className="featured-item">
        <div className="featured-content">
          <div
            className="background"
            style={{
              backgroundImage:
                "url(https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/bg-film-01.png)",
            }}
          ></div>
          <div className="text-content">
            <p className="subtitle">Đặt vé</p>
            <h3 className="title">Xem chương trình hài</h3>
            
          </div>
          <span className="featured-icon">
              <GiOldMicrophone  className="flaticon" />
            </span>
        </div>
      </div>
    </div>
    <div className="movies-now-playing">
        <div className="movies-playing-container">
            <div className="movies-playing-content">
                <div className="watch-new-movies">
                    <div className="new-movies-icon">
                    <PiFilmReel className="flaticon film-roll"/>
                    </div>
                    <div className="top-heading">
                        <h3 className="subtitle">Xem phim mới</h3>
                        <h2 className="title">Các phim mới ra</h2>
                    </div>
                </div>
                <div className="movies-playing-show">
                    <div className="playing-show-content">
                        <div className="playing-show-carousel">
                            <Nowplaying activeDot={activeDot} handleDotClick={handleDotClick}/>
                        </div>
                    </div>
                </div>
                <div className="dots">
        <button
          className={activeDot === 0 ? 'dotActive' : ''}
          onClick={() => handleDotClick(0)}
        >
          <span></span>
        </button>
        <button
          className={activeDot === 1 ? 'dotActive' : ''}
          onClick={() => handleDotClick(1)}
        >
          <span></span>
        </button>
      </div>
            </div>
            
        </div>
        </div>  
        
    </div>

  );
}
