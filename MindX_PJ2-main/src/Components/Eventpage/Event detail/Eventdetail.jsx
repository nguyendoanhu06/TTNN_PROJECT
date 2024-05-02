import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../../Moviepage/Movies all/styles/Moviesall.css";
import "../Event grid/Eventgrid.css";
import { NavLink, useParams } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaArrowRight, FaPinterest } from "react-icons/fa";
import Footer from "../../Footer";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import "../Event detail/Eventdetail.css";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
export default function Eventdetail() {
  const { eventId } = useParams();
  let [event, setEvent] = useState({});

  const { eventCollection } = useContext(FirebaseContext);

  let singledoc = doc(eventCollection, eventId);
  let [mess, setmess] = useState(null);

  useEffect(() => {
    let getmess = async () => {
      const data = await getDoc(singledoc);
      setmess(data.data());
    };
    getmess();
  }, [eventId]);

  useEffect(() => {
    if (mess) {
      setEvent(mess);
    }
  }, [mess]);
  return (
    <div className="eventdetail-header">
      <Navbar />
      <Bannersidepage mess={mess} />
      <img
        src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
        className="headerimg"
      ></img>
      <div className="eventdetail-body">
        <div className="eventdetail-body-container">
          <div className="eventdetail-body-left">
            <div className="eventdetail-left-container">
              <div className="eventdetail-left-header">
                <div className="eventdetail-left-header-container">
                  <div className="content-left">
                    <div className="content-left-wrap">
                      <div className="content-left-container">
                        <h1 className="event-title">{event.title}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="content-right-wrap">
                      <div className="content-right-container">
                        <div className="eventdetail-date">
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="eventdetail-left-body">
                <div className="eventdetail-content">
                  <p>
                    Neque porro est qui dolorem ipsum quia quaed inventore
                    veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo. Aelltes port lacus quis enim var sed efficitur
                    turpis gilla sed sit amet finibus eros. Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                  </p>
                  <h3>
                    {" "}
                    Biophilia is the idea that humans possess an inate tendency
                    seek connections with nature. The term translates
                  </h3>
                  <p>
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. Aelltes port
                    lacus quis enim var sed efficitur turpis.
                  </p>

                  {event && event.img && event.img.length > 0 && (
                    <div className="eventdetail-img-container">
                      <div className="event-detail_img img1">
                        <img src={event.img[0]} alt="Event Image 1" />
                      </div>
                      {event.img.length > 1 && (
                        <div className="event-detail_img img2">
                          <img src={event.img[1]} alt="Event Image 2" />
                        </div>
                      )}
                    </div>
                  )}
                  <p>
                    Neque porro est qui dolorem ipsum quia quaed inventore
                    veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo. Aelltes port lacus quis enim var sed efficitur
                    turpis gilla sed sit amet finibus eros. Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                  </p>
                  <p>
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. Aelltes port
                    lacus quis enim var sed efficitur turpis gilla sed sit amet
                    finibus eros. Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                  </p>
                </div>
                <div className="eventdetail-btn">
                  <div className="registernow-btn">
                    <a href="#" target="_blank">
                      Đăng ký ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="eventdetail-body-right">
            <div className="eventdetail-right-container">
              <div className="eventdetail-right-header">
                <div className="eventdetail-info">
                  <ul className="info-contact">
                    <li>
                      <span className="info">{event.timing}</span>
                      <span className="label">Thời gian</span>
                    </li>
                    <li>
                      <span className="info">{event.date}</span>
                      <span className="label">Ngày tháng</span>
                    </li>
                    <li>
                      <span className="info">{event.category}</span>
                      <span className="label">Phân mục</span>
                    </li>
                    <li>
                      <span className="info">{event.location}</span>
                      <span className="label">Địa điểm</span>
                    </li>
                  </ul>
                  <div className="event-share">
                    <ul className="event-share-social">
                      <li>
                        <a target="_blank">
                          <FaFacebook />
                        </a>
                      </li>
                      <li>
                        <a target="_blank">
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a target="_blank">
                          <FaPinterest />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="eventdetail-right-footer">
                <div className="eventdetail-right-footer-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2138.461912725799!2d-74.00870570149009!3d40.7126923692514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a220c5efc31%3A0x96fef19aee644769!2sNew%20York%20City%20Hall%2C%20New%20York%2C%20NY%2010007%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1709803115844!5m2!1svi!2s"
                    width="600"
                    height="450"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
