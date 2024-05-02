import React from "react";
import "../styles/Sideintroduce.css"
import { PiFilmReelBold, PiFilmSlateBold, PiFilmStrip } from "react-icons/pi";
import { GiFilmProjector } from "react-icons/gi";

export default function SideIntroduce() {
  return (
    <section className="side-introduce">
      <div className="side-introduce-container">
        <div className="side-introduce-item-container">
          <div className="side-introduce-item">
            <div className="side-introduce-item-wrap">
              <div className="side-introduce-item-context">
                <div className="side-introduce-box">
                  <div className="side-introduce-box-bg"></div>
                  <div className="side-introduce-overlay"></div>
                  <div className="side-introduce-box-content">
                    <h3 className="title">Top 6 bộ phim trong rạp</h3>
                  </div>
                  <span className="box-icon">
                    <PiFilmSlateBold />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-introduce-item-container">
          <div className="side-introduce-item">
            <div className="side-introduce-item-wrap">
              <div className="side-introduce-item-context">
                <div className="side-introduce-box">
                  <div
                    className="side-introduce-box-bg"
                    style={{
                      backgroundImage:
                        'url("https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-2-film-feature-home-1.jpg")',
                    }}
                  ></div>
                  <div
                    className="side-introduce-overlay"
                    style={{ backgroundColor: "#d96c2c" }}
                  ></div>
                  <div className="side-introduce-box-content">
                    <h3 className="title">Phim sắp ra mắt</h3>
                  </div>
                  <span className="box-icon">
                  <PiFilmStrip />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-introduce-item-container">
          <div className="side-introduce-item">
            <div className="side-introduce-item-wrap">
              <div className="side-introduce-item-context">
                <div className="side-introduce-box">
                  <div
                    className="side-introduce-box-bg"
                    style={{
                      backgroundImage:
                        'url("https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-3-film-feature-home-1.jpg")',
                    }}
                  ></div>
                  <div className="side-introduce-overlay"></div>
                  <div className="side-introduce-box-content">
                    <h3 className="title">Xem ngay trailer của các phim hot</h3>
                  </div>
                  <span className="box-icon">
                  <GiFilmProjector />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
