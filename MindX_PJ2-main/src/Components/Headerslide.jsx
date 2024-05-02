import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Slider.css";
import "../styles/Trailerpopup.css";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import React, { useState, useEffect, useContext } from "react";
import { query, limit, getDocs } from "firebase/firestore";
import { FaTwitter, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { ImCancelCircle } from "react-icons/im";
import Slider from "react-slick";
import Ticket from "./Moviepage/Cart movies/Ticket";
import { NavLink } from "react-router-dom";

function ThumbnailSlider({
    slideItems,
    videoTrailers,
    showPopup,
    setShowPopup,
    currentSlide,
    slideCount,
    setSlideCount

}) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2100,
  };

  useEffect(() => {
    setSlideCount(slideItems.length);
  }, [slideItems, setSlideCount]);

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const handlePlayButtonClick = (index) => {
    setSelectedVideoIndex(index);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const popupStyle = {
    display: showPopup ? 'flex' : 'none'
  };

  return (
    <div className="trailer-slider-wrapper">
      <img
        src="https://demo.ovatheme.com/aovis/wp-content/plugins/movie-booking/assets/img/arrow-watch-trailer.png"
        alt=""
        className="arrow-trailer"
      />
      <span className="text-trailer">Trailers</span>

      <Slider {...settings}>
        {slideItems.map((item, index) => (
          <div className="drag-track" key={item.id}>
            <div className="slick-slide">
              <div className="movie-trailer-item">
                <div className={`movie-trailer-media ${currentSlide === index ? 'movie-trailer-media-active' : ''}`}>
                  <img src={item.subImg[0]} alt={item.nameFilm} />
                  <div className="has-trailer">
                    <div
                      className="trailer-video"
                      onClick={() => handlePlayButtonClick(index)}
                    >
                      <FaPlay className="trailer-play" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {showPopup && (
        <div className="trailer-popup" style={popupStyle}>
          <div className="trailer-popup-container fullscreen">
            <div className="trailer-popup-content">
              <ImCancelCircle
                className="close-button"
                onClick={handleClosePopup}
              />
              <div className="trailer-here">
                <ReactPlayer
                  url={videoTrailers[selectedVideoIndex]}
                  width="100%"
                  height="100%"
                  controls={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Headerslide() {
  const { app, messCollect } = useContext(FirebaseContext);
  const [slideItems, setSlideItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);



  const [selectedMovie, setSelectedMovie] = useState(null); // for ticket
  const [ticketOpen, setTicketOpen] = useState(false);

  const handleBookingClick = (movie) => {
    setSelectedMovie(movie);
  };



  const handleSlideChange = (current) => {
    setCurrentSlide(current);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect, limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSlideItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [app, messCollect]);

  return (
    <div className="main-slider">
      <Slider
        dots={false}
        arrows={false}
        infinite={true}
        speed={1000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={2000}
        afterChange={handleSlideChange}
      >
        {slideItems.map((item) => (
          <div className="big-slider" key={item.id}>
            <img src={item.subImg[0]} alt={item.nameFilm} />
            <div className="big-slider-overlay">
              <div className="movie-sharing">
                <span className="text-share">Share</span>
                <span className="line"></span>
                <ul className="share-social">
                  <li>
                    <a>
                      <FaTwitter className="share-social-icon" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <FaFacebookF className="share-social-icon" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <FaPinterestP className="share-social-icon" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="big-slider-text">
                <div className="big-slider-heading">
                  <h3 className="big-slider-movie-category">
                    {item.infoFilm.catagory[0]}
                  </h3>
                  <NavLink to={`/movies/${item.id}`}>
                    <h1 className="big-slider-movie-title">{item.nameFilm}</h1>
                  </NavLink>
                </div>
                <p className="big-slider-excerpt">
                  Biên kịch và đạo diễn bởi {item.infoFilm.director}
                </p>
                <div className="big-slider-button">
                <NavLink to={`/movies/${item.id}`}>
                    <button className="more-info">Chi tiết</button>
                    </NavLink>
                  <button className="button-booking" onClick={() => handleBookingClick(item)}>Đặt vé ngay</button>
                </div>
              </div>

              <div className="big-slider-release">
                <span className="text">Công chiếu </span>
                <h3 className="time">{item.infoFilm.releaseDate}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <ThumbnailSlider
        videoTrailers={slideItems.map((item) => item.videoTrailer)}
        slideItems={slideItems}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        currentSlide={currentSlide}
        slideCount={slideCount}
        setSlideCount={setSlideCount}
      />
      {selectedMovie && <Ticket selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}

    </div>
  );
}

export default Headerslide;

