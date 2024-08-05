import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../../Firebase/FirebaseProvider';
import { getDoc, doc } from 'firebase/firestore';
import MoreMovie from './MoreMovie';
import { NavLink } from "react-router-dom";
import "./Style.css"
import VideoTrailer from './VideoTrailer'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { FaArrowAltCircleRight, FaPlay } from "react-icons/fa";
import { FaArrowDown } from 'react-icons/fa6';
import Bannersidepage from '../Components/Bannersidepage';
import Ticket from '../Components/Moviepage/Cart movies/Ticket';

export default function Detail() {
 
    const { movieId } = useParams()
    const { messCollect } = useContext(FirebaseContext);
    // render data
    const [carouselItems, setCarouselItems] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(messCollect, movieId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCarouselItems([{ id: docSnap.id, ...docSnap.data() }]);
                } else {
                    console.log("No such document!");
                    setCarouselItems([{}]);
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchData();
    }, [messCollect, movieId]);

    // video trailer
    // handle trailer popup
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    // handle watch trailer
    const handleWatchTrailer = (videoUrl) => {
        setSelectedVideoUrl(videoUrl);
        setIsTrailerOpen(true);
    };

    //close watch trailer
    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
    };

    // ticket 
    const handleBookingClick = (movie) => {
        setSelectedMovie(movie);
      }
    return (
        <div>
            {/* HEADER */}
            <div className="header">
                <Navbar />
                
            </div>
            <div className='productdetail'>
                {/* BANNER */}
                <div className="productdetail-banner" >
                    {carouselItems.map((item) => (

                        <div className="productdetail-banner-content" key={item.id}>

                            <div className="banner-content">
                                <div className="banner-content-link">
                                    <div><a href="">Home</a></div>
                                    <div>&gt;</div>
                                    <div>{item.infoFilm.catagory.map((category, index) => (
                                        <React.Fragment key={index}>
                                            <NavLink to={`/movies-category/${category}`}>
                                                {category}
                                            </NavLink>
                                            {index !== item.infoFilm.catagory.length - 1 && (
                                                <span>, </span>
                                            )}
                                        </React.Fragment>
                                    ))}</div>
                                    <div>&gt;</div>
                                    <div>{item.nameFilm}</div>
                                </div>
                                <div className="banner-content-title">
                                    <h2>{item.nameFilm}</h2>
                                </div>
                            </div>

                            <div className="banner-img">
                                <img src={item.subImg[0]} alt="Movie Banner" />
                            </div>
                        </div>
                    ))}
                    <img src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg" alt="" />
                </div>
                {/* MOVIE CONTENT */}
                <div className="productdetail-content">
                    {carouselItems.map((item) =>
                        <div className="productdetail-content-item" key={item.id}>
                            <div className="productdetail-content-title">
                                <div className='productdetail-content-name'>
                                    <h2>{item.nameFilm}</h2>
                                    <div className="productdetail-content-catogery">
                                        <div>
                                            {item.infoFilm.catagory.map((category, index) => (
                                                <React.Fragment key={index}>
                                                    <NavLink to={`/movies-category/${category}`}>
                                                        {category}
                                                    </NavLink>
                                                    {index !== item.infoFilm.catagory.length - 1 && (
                                                        <span>, </span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div>/</div>
                                        <div>{item.infoFilm.time}</div>
                                    </div>
                                </div>
                                <div className='productdetail-content-button'>
                                    <button onClick={() => handleBookingClick(item)}>Đặt vé</button>
                                </div>
                            </div>
                            <div className="productdetail-content-movie">
                                <div className="movie-img">
                                    <img src={item.img} alt="Movie IMG" />
                                </div>
                                {/* VIDEO TRAILER */}
                                <div className="movie-video" >
                                    <img src={item.subImg[0]} alt="video img" />
                                    <p className="watch" >
                                        <p>Xem trailer</p>
                                        <FaArrowDown className='arrow'/>
                                    </p>
                                    <div className="icon-content-view" onClick={() => handleWatchTrailer(item.videoTrailer)}>
                                        <div className="content-video-btn">
                                            <FaPlay className="content-video-icon" />
                                        </div>
                                    </div>
    
                                    <VideoTrailer
                                        isOpen={isTrailerOpen}
                                        selectedVideoUrl={selectedVideoUrl}
                                        handleClosePopup={handleCloseTrailer} />

                                </div>
                            </div>
                        </div>
                    )}



                    {/* MOVIE INFO */}
                    {carouselItems.map((item) => (
                        <div className="productdetail-content-info" key={item.id}>
                            <div className="info-left">
                                <p><strong>Đạo diễn: </strong>{item.infoFilm.director}</p>
                                <p><strong>Quốc gia: </strong>{item.infoFilm.country}</p>
                                <p><strong>Độ tuổi: </strong>{item.infoFilm.rating}</p>
                            </div>
                            <div className="info-right">
                                <p><strong>Ngày chiếu: </strong>{item.infoFilm.releaseDate}</p>
                                <p><strong>Thời gian: </strong>{item.infoFilm.time}</p>
                            </div>
                        </div>
                    ))}
                    <hr />
                    {/* TOP CAST */}
                    {carouselItems.map((item) => (
                        <div className="productdetail-content-cast" key={item.id}>
                            <h2>Diễn viên chính</h2>
                            <ul>
                                {item.infoFilm.cast.map((castMember, castIndex) => (
                                    <li key={castIndex}>
                                        <div className='cast-info'>
                                            <img src={castMember.img} alt="" />
                                            <div className="cast-name">
                                                <div><strong>{castMember.name}</strong></div>
                                                <div className='role'>vai: {castMember.role}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}
                    {/* STORY LINE */}
                    {carouselItems.map((item) => (
                        <div className="productdetail-content-story" key={item.id}>
                            <h2>Nội dung phim</h2>
                            <div>{item.infoFilm.story}</div>
                        </div>
                    ))}
                    {/* MORE MOVIE */}
                    <div className="productdetail-content-more">
                        <h2>Phim khác</h2>
                        <MoreMovie />

                    </div>


                </div >
            </div>
            {/* FOOTER */}
            <Footer />
            {selectedMovie && (
        <Ticket
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
        </div>
    )
}
