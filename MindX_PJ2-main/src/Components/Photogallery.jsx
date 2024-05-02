import React, { useState } from 'react'
import '../styles/Photogallery.css'
import { CgShapeTriangle } from "react-icons/cg";
import { FaInstagram } from 'react-icons/fa';
import { Modal, Carousel } from 'react-bootstrap';

export default function Photogallery() {
    
    //handle gallery popup
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
  return (
    <div className="photo-gallery-section">
    <div className="photogallery-top">
        <div className="photogallery-overlay"></div>

            <div className="photogallery-shapebottom">
            <CgShapeTriangle className="shape-icon"/>
            </div>
            <div className="photogallery-container">
                <div className="photogallery-content">
                    <div className="gallery-wrap">
                        <div className="gallery-text-container">
                            <div className="gallery-text">
                                Thư viện ảnh
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div className="photo-gallery-bottom">
        <div className="photo-list">
            <div className="photo-list-container">
            <div className="photo-list-context">
                <div className="photo-list-content">
                    <div className="photo-list-item-container">
                        <div className="photo-gallery-slide">
                            <div className="gallery-slide">
                                <div className="slide-outer">
                                    <div className="photo-item-stage">
                                        <div className="photo-item">
                                        <div className="gallery-box">
                                            <a  className="gallery-fancy-box">
                                                <div className="list-gallery">
                                                    <div className="decor-line-1">

                                                    </div>
                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg" alt="Gallery Slide" />
                                                    <div className="icon-box">
                                                    <FaInstagram className="icon-ins"/>

                                                    </div>
                                                    <div className="decor-line-2">

                                                    </div>

                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                        <div className="photo-item">
                                        <div className="gallery-box"onClick={handleShowModal} >
                                            <a className="gallery-fancy-box" >
                                                <div className="list-gallery">
                                                    <div className="decor-line-1">

                                                    </div>
                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-2-gallery-slide-285x300.jpg" alt="" />
                                                    <div className="icon-box">
                                                    <FaInstagram className="icon-ins"/>

                                                    </div>
                                                    <div className="decor-line-2">

                                                    </div>

                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                        <div className="photo-item">
                                        <div className="gallery-box" onClick={handleShowModal}>
                                            <a  className="gallery-fancy-box">
                                                <div className="list-gallery">
                                                    <div className="decor-line-1">

                                                    </div>
                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-3-gallery-slide-285x300.jpg" alt="" />
                                                    <div className="icon-box">
                                                    <FaInstagram className="icon-ins"/>

                                                    </div>
                                                    <div className="decor-line-2"></div>

                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                        <div className="photo-item">
                                        <div className="gallery-box" onClick={handleShowModal}>
                                            <a  className="gallery-fancy-box">
                                                <div className="list-gallery">
                                                    <div className="decor-line-1">

                                                    </div>
                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-4-gallery-slide-285x300.jpg" alt="" />
                                                    <div className="icon-box">
                                                    <FaInstagram className="icon-ins"/>

                                                    </div>
                                                    <div className="decor-line-2"></div>

                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                        <div className="photo-item">
                                        <div className="gallery-box" onClick={handleShowModal}>
                                            <a  className="gallery-fancy-box">
                                                <div className="list-gallery">
                                                    <div className="decor-line-1">

                                                    </div>
                                                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-5-gallery-slide-285x300.jpg" alt="" />
                                                    <div className="icon-box">
                                                    <FaInstagram className="icon-ins"/>

                                                    </div>
                                                    <div className="decor-line-2"></div>

                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    {/* <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
                <Modal.Body>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/img-1-gallery-slide-285x300.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>

                </Modal.Body>
            </Modal> */}
    </div>
  )
}
