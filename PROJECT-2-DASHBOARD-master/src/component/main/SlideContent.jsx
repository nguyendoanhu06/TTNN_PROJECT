import React from 'react'

import { HiMenuAlt2 } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
export default function SlideContent({ closeSlideBar }) {
    let getMail = localStorage.getItem("gmail")
    let name = localStorage.getItem("name")
    return (
        <div className='slide-header'>
            <div className="slide-tool-bar">
                <div className="slide-menu" onClick={closeSlideBar}>
                    <HiMenuAlt2 fontSize={26} />
                </div>
            </div>
            <div className="slide-user">
                <div className="user-nation">
                    <img src="https://static.vecteezy.com/system/resources/previews/016/328/942/original/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png" alt="vietnam" />
                </div>
                <div className="announcement">
                    <FaBell fontSize={26} />
                </div>
                <div className="user-introduction">
                    <div className="user-avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/805/805404.png" alt="messi" />
                    </div>
                    <div className="user-information">
                        <h4>{name}</h4>
                        <h5>{getMail}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
