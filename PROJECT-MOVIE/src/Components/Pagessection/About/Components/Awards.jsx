import React, { useEffect, useState } from "react";
import "../style/About.css";
import { LiaAwardSolid } from "react-icons/lia";
import CountUp from "react-countup";
import { Scrollama, Step } from "react-scrollama";
import { GiFilmProjector } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import VisibilitySensor from "react-visibility-sensor";

export default function Awards({  }) {

    //handle number moving when scroll down
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // check if element is visible
      const handleVisibilityChange = () => {
        const element = document.querySelector(".award-section-container");
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          const isElementVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
          setIsVisible(isElementVisible);
        }
      };
      
      window.addEventListener("scroll", handleVisibilityChange);
      handleVisibilityChange();
  
      return () => {
        window.removeEventListener("scroll", handleVisibilityChange);
      };
    }, []);
    
  return (
    <section className="award-section">

          <div className="award-section-container">
            <div className="award-section-content">
              <div className="award-section-wrap">
                <div className="award-item-container">
                  <div className="award-item-content">
                    <div className="award-item">
                      <div className="award-item-wrap">
                        <div className="award-counter">
                          <div className="icon">
                            <LiaAwardSolid />
                          </div>
                          <div className="text-counter">
                            <span className="top-text">
                                
                            {isVisible && (
                            <CountUp start={0} end={23} duration={2} />
                          )}
                            </span>
                            <p className="content">Giải thưởng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="award-item">
                      <div className="award-item-wrap">
                        <div className="award-counter">
                          <div className="icon">
                            <GiFilmProjector />
                          </div>
                          <div className="text-counter">
                            <span className="top-text">
                            {isVisible && (
                            <CountUp start={0} end={870} duration={2} />
                          )}
                            </span>
                            <p className="content">Tổng phim </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="award-item">
                      <div className="award-item-wrap">
                        <div className="award-counter">
                          <div className="icon">
                            <GrUserManager />
                          </div>
                          <div className="text-counter">
                            <span className="top-text">
                            {isVisible && (
                            <CountUp start={0} end={30} duration={2} />
                          )}
                            </span>
                            <p className="content">Đạo diễn</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="award-item">
                      <div className="award-item-wrap">
                        <div className="award-counter">
                          <div className="icon">
                            <BsFillTicketDetailedFill />
                          </div>
                          <div className="text-counter">
                            <span className="top-text">
                            {isVisible && (
                            <CountUp start={0} end={980} duration={2} />
                          )}
                            </span>
                            <p className="content">Số vé bán</p>
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
