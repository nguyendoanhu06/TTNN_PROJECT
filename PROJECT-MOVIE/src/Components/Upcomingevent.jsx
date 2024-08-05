import React, { useContext, useEffect, useState } from "react";
import "../styles/Upcomingevent.css";
import { PiFilmReelBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import { getDocs, query, where } from "firebase/firestore";
export default function Upcomingevent() {
  const { eventCollection } = useContext(FirebaseContext);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const q = query(eventCollection, where("upcoming", "==", 1));
        const querySnapshot = await getDocs(q);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching upcoming events: ", error);
      }
    };

    fetchUpcomingEvents();
  }, [eventCollection]);
  return (
    <div className="upcoming-event-section">
      <div className="upcoming-event-bg-overlay"></div>
      <div className="upcoming-event-container">
        <div className="upcoming-left">
          <div className="upcoming-left-container">
            <div className="upcoming-left-header">
              <div className="upcoming-left-header-container">
                <div className="upcoming-left-content-container">
                  <div className="upcoming-left-content">
                    <div className="upcoming-left-icon">
                      <PiFilmReelBold className="upcoming-icon" />
                    </div>
                    <div className="upcoming-left-heading">
                      <h3 className="sub-title">Sự kiện sắp diễn ra</h3>
                      <h2 className="title">
                        Đăng ký ngay để không bỏ lỡ những sự kiện này
                      </h2>
                    </div>
                    <p className="description">
                      Every man must decide whether he will walk in the light of
                      creative altruism or in the darkness of eritdestructive
                      selfishness. Ut porttitor et lectus ut tempus. Aliquam
                      lacinia justo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="upcoming-left-bottom">
              <div className="upcoming-left-bottom-container">
                <div className="upcoming-left-btn-wrapper">
                  <NavLink className="button-link" to={"/#"}>
                    <span className="button-content-wrapper">
                      <span className="button-text">Xem chi tiết</span>
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upcoming-right">
          <div className="upcoming-right-wrap">
            <div className="upcoming-right-container">
              <div className="upcoming-right-event">
                <div className="container-event">
                  <div className="main-event">
                    <div className="archieve_event">
                      {upcomingEvents.map((event) => (
                        <div className="event-item" key={event.id}>
                          <div className="event-item-type1">
                            {/* Thumbnail */}
                            <div className="event-desc">
                              <div className="event-thumbnail">
                                {/* Display highlight date */}
                                <div className="date-event">
                                  <span className="date">{event.date}</span>
                                </div>
                                <NavLink
                                  className="event-img "
                                  to={`/events/${event.id}`}
                                >
                                  <img src={event.img[0]} />
                                </NavLink>
                              </div>
                              <div className="event-post">
                                <div className="meta-event">
                                  <div className="time-qual-date">
                                    <span className="icon-time">
                                      <FaClock />
                                    </span>
                                    <span className="time-date-children">
                                      <span className="date-child">
                                        {event.timing}
                                      </span>{" "}
                                    </span>
                                  </div>
                                  <div className="venue">
                                    <FaLocationPin className="icon-location" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                {/*Title */}
                                <h2 className="event-title">
                                  <NavLink to={`/events/${event.id}`}>
                                    {event.title}
                                  </NavLink>
                                </h2>
                                {/* Read more button */}
                                <div className="button-event">
                                  <NavLink
                                    className="view-detail"
                                    to={`/events/${event.id}`}
                                  >
                                    Read More
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
