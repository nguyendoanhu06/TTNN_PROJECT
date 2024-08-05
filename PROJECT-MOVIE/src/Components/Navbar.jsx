import React, { useState } from "react";
import "../styles/Navbarstyle.css";
import { IoMdSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useRef } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const clickSearch = () => {
    setShowSearch(true);
  };



  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // handle search bar 
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      window.location.href = `/search/${searchTerm}`;

    }
  };

  return (
    <div className={`navigation-bar ${scroll ? "scrolled" : ""}`}>
      <div className="navbarContent">
        <div className="navbar-brand">
          <NavLink to={"/"} className=".orange-link">
            <img
              src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/logo-white.png"
              alt="Aovis – Film & Movie Booking WordPress Theme"
            />
          </NavLink>
        </div>
        <div className="navbar-main">
          <ul className="menu">
            <li className="menu-item">
            <NavLink to={"/"}>Trang Chủ</NavLink>
            </li>
            <li className="menu-item arrow-down">
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
          </ul>
        </div>
        <div className="utility-bar">
          <div className="search" >
            <IoMdSearch className="navbar-icon search-icon" onClick={clickSearch}/>
            {showSearch && (
            <div className="search-popup">
            <div className="search-popup-overlay">

                <div className="search-box">
                  <form action="" role="search" method="get" onSubmit={handleSearch}>
                    <input
                      type="search"
                      className="search-field"
                      placeholder="Search ..."
                      value={searchTerm}
                      title="Search for:"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-submit" onClick={handleSearch}>
                      <IoMdSearch className="search-icon-box" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            )}
          </div>
          <div className="login">
            <NavLink to={"/info"}>
              <CiUser className="navbar-icon login-icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
