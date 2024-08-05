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
import '../Event list/style/Eventlist.css'
export default function Eventlist() {
  const { app, messCollect } = useContext(FirebaseContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore(app)
      const eventCollectionRef = collection(db, "events");
      const eventSnapshot = await getDocs(eventCollectionRef);
      const eventList = eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, [app]);
  return (
    <div className="event-list">
      <div className="event-list-header">
        <Navbar/>
        <Bannersidepage/>
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="event-list-body">
          <div className="eventlist-body-container">
            <div className="eventlist-body-col">
              <div className="eventlist-body-wrap">
                <div className="eventlist-content-container">
                    <div className="eventlist-content">
                    {events.map(event => (

                      <div className="eventlist-item" key={event.id}>
                        <div className="date-time_title">
                          <div className="date-start">
                          <span>
                          {event.dateList[0]}
                          </span>
                          <span>
                          {event.dateList[1]}
                          </span>
                          </div>
                          <div className="time_title">
                          <div className="time-venue">
                          <div className="time">
                            <span className="icon-time">
                            <IoTime/>
                            </span>
                            <span>{event.timing}</span>
                          </div>
                          <div className="venue">
                            <IoLocation/>
                            <span className="number">
                            {event.location}
                            </span>
                          </div>
                          </div>
                          <h3 className="title">  
                          <NavLink to={`/events/${event.id}`}>{event.title}</NavLink>
                          </h3>
                          </div>
                        </div>
                        <div className="eventlist_booking-btn">
                        <a href="#" target="_blank">Register Now</a>
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
  )
}
