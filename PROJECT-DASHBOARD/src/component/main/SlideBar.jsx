import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import { TfiDashboard } from "react-icons/tfi";
import { GrCatalogOption } from "react-icons/gr";
import { GoPerson } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { SiGoogleanalytics } from "react-icons/si";
import { FaFileInvoice } from "react-icons/fa";

export default function SlideBar({ toggleTheme, darkMode }) {
  let navigate = useNavigate();
  return (
    <div className='slide-bar-content'>
      <div className="nav-header">
        <span>
          <NavLink to={"/"}>Admin</NavLink>
        </span>
        <div className="dark-mode">
          <input onChange={() => { }} checked={darkMode} type="checkbox" id="toggle-btn" />
          <div className="display">
            <label htmlFor="toggle-btn" onClick={toggleTheme}>
              <div className="circle">
                <svg className="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
                <svg className="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                </svg>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="nav-link">
        <h5>Application</h5>

        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <TfiDashboard color='white' width={16} height={16} />
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>

          <div className="accordion" id="accordionPanelsStayOpenExample">

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                  <GrCatalogOption color='white' width={16} height={16} />
                  Catalog
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                      <NavLink to={"/filmslist"}>Films List</NavLink>
                    </li>
                    <li className='navbar-toggle'>
                      <NavLink to={"/film"}>Film</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <h5 style={{ padding: "0", marginTop: "50px" }}>Pages</h5>

          <li className='navbar-toggle'>
            <FaFileInvoice color='white' width={16} height={16} />
            <NavLink to={"/authentication"}>Authentication</NavLink>
          </li>

        </ul>

        <div className="back-home">
          <button onClick={() => {
            navigate("/")
          }}>Back to Home</button>
        </div>

      </div>

    </div>
  )
}
