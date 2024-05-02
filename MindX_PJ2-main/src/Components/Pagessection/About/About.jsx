import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../../Moviepage/Movies all/styles/Moviesall.css";
import { NavLink } from "react-router-dom";
import '../About/style/About.css'
import Footer from "../../Footer";
import Logoslider from "../../Logoslider";
import Introduce from "./Components/Introduce";
import Aboutbanner from "./Components/Aboutbanner";
import Awards from "./Components/Awards";
import { Scrollama, Step } from 'react-scrollama';
import Filmcrew from "./Components/Filmcrew";
import Ourfeedbacks from "./Components/Ourfeedbacks";
export default function About() {

  return (
    <div className="about-page">
      <div className="about-header">
       <Navbar/>
       <Bannersidepage/>
       <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="about-body">
            <Introduce/>
            <Logoslider/>
            <Aboutbanner/>
          <Awards />
          <Filmcrew/>
          <Ourfeedbacks/>
          <section className="sale-banner">
          <div className="sale-banner-container">
            <div className="sale-banner-content">
              <div className="sale-banner-wrap">
                <div className="sale-banner-overlay"></div>
                <div className="sale-banner-text">
                  <p>Giảm giá 40% cho học sinh, sinh viên</p>
                </div>
                <div className="sale-banner-btn">
                  <div className="sale-banner-btn-container">
                    <div className="sale-banner-btn-wrapper">
                      <button className="sale">Đặt vé ngay</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  )
}
