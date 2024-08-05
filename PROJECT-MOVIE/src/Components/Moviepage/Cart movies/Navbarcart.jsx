import React, { useState } from "react";
import "../../../styles/Navbarstyle.css"
import { IoMdSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useRef } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbarcart({ isLoggedIn, onLogout  }) {
  const handleLogoutClick = () => {
    onLogout(); 
  };
  return (
    <div className={`navigation-bar ${scroll ? "scrolled" : ""}`}>
      <div className="navbarContent">
        <div className="navbar-brand">
          <a href="#" className=".orange-link">
            <img
              src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/logo-black.png"
              alt="Aovis – Film & Movie Booking WordPress Theme"
            />
          </a>
        </div>
        <div className="navbar-main">
          <ul className="menu">
            <li className="menu-item">
            <NavLink to={"/"}>Trang Chủ</NavLink>
            </li>
            <li className="menu-item arrow-down" >
            <NavLink to={"/movies-all"}>Danh sách phim</NavLink>

              <ul className="sub-menu">
                <li>
                <NavLink to={"/movies-all"}>Toàn bộ danh sách</NavLink>
                </li>
                <li>
                <NavLink to={"/movies-now-playing"}>Phim đang chiếu</NavLink>
                </li>
                <li>
                <NavLink to={"/movies-coming-soon"}>Phim sắp chiếu</NavLink>
                </li>
              </ul>
            </li>
            <li className="menu-item arrow-down">
            <NavLink to={"/events"}>Sự kiện</NavLink>

              <ul className="sub-menu">
                <li>
                <NavLink to={"/events"}>Sự kiện</NavLink>
                </li>
                <li>
                <NavLink to={"/events-list"}>Đăng ký sự kiện</NavLink>
                </li>
              </ul>
            </li>
            <li className="menu-item arrow-down">
            <NavLink to={"/about"}>Thông tin</NavLink>

              <ul className="sub-menu">
                <li>
                <NavLink to={"/about"}>Về chúng tôi</NavLink>            
                    </li>
                <li>
                <NavLink to={"/faqs"}>Câu hỏi thường gặp</NavLink>            
                </li>
                <li>
                <NavLink to={"/my-account"}>Tài khoản</NavLink>            
                </li>
              </ul>
            </li>
            <li className="menu-item">
            <NavLink to={"/news"}>Tin tức</NavLink>            
            </li>
            <li className="menu-item">
            <NavLink to={"/contact"}>Liên hệ</NavLink>            
            </li>
            {isLoggedIn && (
              <li className="menu-item">
                <button onClick={handleLogoutClick}>Đăng xuất</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
