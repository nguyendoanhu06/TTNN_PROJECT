import React from 'react'
import Navbar from '../../Navbar'
import Bannersidepage from '../../Bannersidepage'
import { TiTick } from "react-icons/ti";
import '../Cart movies/Success.css'
export default function Success() {
  return (
    <div className="success-page">
        <div className="success-header">
            <Navbar/>
            <Bannersidepage/>
            <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
        </div>
        <div className="success-body">
            <div className="header-text">
                <div className="header-icon">
                <TiTick />

                </div>
                <h5 className="">Đặt vé thành công, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</h5>

            </div>
            <div className="body-ticket">
                
            </div>
        </div>
    </div>
  )
}
