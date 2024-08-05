import React, { useContext, useState } from "react";
import "../Cart movies/Ticket.css";
import moment from "moment";

import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { NavLink } from "react-router-dom";
export default function Ticket({ selectedMovie, setSelectedMovie }) {
  const [selectedSchedule, setSelectedSchedule] = useState(0);
  const handleTabClick = (index) => {
    setSelectedSchedule(index);
  };

  const handleCloseModal = () => {
    setSelectedMovie(false);
  };
  return (
    <div
      className="ticket_popup"
      style={{ display: selectedMovie ? "block" : "" }}
    >
      <div className="ticket_container">
        <div className="ticket-content">
          <ul className="toggle-date-tabs">
            {selectedMovie.movieShowSchedule.map((schedule, index) => {
              const [year, month, day] = schedule.dayShow.split("/");

              return (
                <li
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={selectedSchedule === index ? "current-select" : ""}
                >
                  <div className="day">
                    <span className="D_m_day">
                      <span className="m_day">{month}</span>
                      <span className="D_day">
                        {moment(schedule.dayShow, "YYYY/MM/DDD").format("ddd")}
                      </span>
                    </span>
                    <span className="d_day">
                      <strong>{day}</strong>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="collateral-tabs">
            <div className="tab-container">
              <div className="tab-content showtimes">
                {selectedSchedule !== null && (
                  <div className="tab-venue">
                    <div className="tab-name">
                      <h3>
                        {
                          selectedMovie.movieShowSchedule[selectedSchedule]
                            .location
                        }
                      </h3>
                    </div>
                    <div className="room-name">
                      <h4>
                        Phòng chiếu{" "}
                        {selectedMovie.movieShowSchedule[selectedSchedule].room}
                      </h4>
                    </div>
                    <ul className="tab-showtime">
                      <li>
                        <NavLink
                          to={`/movies/${selectedMovie.id}/${selectedMovie.movieShowSchedule[selectedSchedule].id}`}
                        >
                          <span>
                            {
                              selectedMovie.movieShowSchedule[selectedSchedule]
                                .timeShow
                            }
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ticket_close" onClick={handleCloseModal}>
            x
          </div>
        </div>
      </div>
    </div>
  );
}
