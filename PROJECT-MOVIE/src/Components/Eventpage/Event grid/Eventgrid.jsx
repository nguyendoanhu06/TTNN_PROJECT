import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../../Moviepage/Movies all/styles/Moviesall.css";
import "../Event grid/Eventgrid.css";
import { NavLink } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../Footer";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Eventgrid() {
  const { app, eventCollection } = useContext(FirebaseContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore(app);
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, [app]);

  return (
    <div className="eventgrid">
      <div className="eventgrid-header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="eventgrid-body">
        <div className="eventgrid-body-container">
          <div className="eventgrid-body-col">
            <div className="eventgrid-body-wrap">
              <div className="container-event">
                <div className="main-event">
                  <div className="archive_event">
                    {events.map((event) => (
                      <div className="ev-content" key={event.id}>
                        <div className="type2">
                          <div className="desc">
                            <div className="event-thumbnail overlay-thumbnail">
                              <NavLink>
                                <img src={event.img[0]} />{" "}
                              </NavLink>
                            </div>
                            <div className="event_post">
                              <div className="date-event">
                                <span className="date">{event.date}</span>
                              </div>
                              <h2 className="event_title">
                                <NavLink to={`/events/${event.id}`}>
                                  {event.title}
                                </NavLink>{" "}
                              </h2>
                              <div className="time-event">
                                <div className="wrapper date">
                                  <div className="time equal-date">
                                    <span className="icon-time">
                                      <IoTime />
                                    </span>
                                    <span className="time-date-child">
                                      <span className="date-child">
                                        {event.timing}
                                      </span>
                                    </span>
                                  </div>
                                  <label>Thời gian</label>
                                </div>
                                <div className="wrapper location">
                                  <div className="venue">
                                    <IoLocation />

                                    <span>{event.location}</span>
                                  </div>
                                  <label>Địa điểm</label>
                                </div>
                              </div>
                              <NavLink
                                to={`/events/${event.id}`}
                                className="gotodetail"
                              >
                                <div className="icon">
                                  <FaArrowRight />
                                </div>
                              </NavLink>
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
      <Footer />
    </div>
  );
}
